import { GoogleGenAI } from '@google/genai';
import type { IncomingMessage, ServerResponse } from 'node:http';

/**
 * Studio Arch — AI Design Assistant (server-side Gemini proxy).
 * POST /api/ask  { message: string }  ->  { reply: string }
 *
 * Requires the GEMINI_API_KEY environment variable (configure in Vercel:
 * Project -> Settings -> Environment Variables). If missing this returns
 * HTTP 503 with code MISSING_API_KEY so the UI can show a helpful hint.
 */

const MODEL = 'gemini-2.0-flash';

const SYSTEM_PROMPT = `You are the AI Design Assistant for Studio Arch, a UK architectural drafting & structural engineering studio (\"Studio Arch | Architectural Plans & Drafting\"). Your tone is precise, technical, and quietly confident — like a senior architectural technologist at a drawing board. Keep replies concise (under ~180 words), use short dashes or numbered points only when they genuinely aid readability, and return to plain English after any jargon.

You may reference THIS verified context only:
- Services: full architectural drafting (general arrangement plans 1:50/1:100, sections, elevations, junction details 1:5-1:20), planning permission applications & support, building regulations packages (Approved Documents Part A-S), structural engineering calculations (BS EN 1990/1993, IStructE), measured surveys & 3D/CAD modelling, heritage/conservation-area & listed-building consent, Party Wall etc. Act 1996 coordination.
- Process: consultation -> site survey -> concept/schematic -> technical drawings -> planning submission -> building regs + structural -> construction issue (approx. RIBA stages 0-4). Typical residential drawings take 3-4 weeks; council decisions run on an 8-week statutory timetable.
- Fee ballparks (per the on-site estimator): residential extension from £950 + £12/m², loft conversion £1,100 + £14/m², new build £2,400 + £18/m², commercial fit-out £1,800 + £15/m², heritage restoration £2,800 + £22/m². Planning support £450-£1,600 depending on zone (conservation/green belt/listed). Structural eng from £550 + £6/m². Building regs package ≈55% of base drawings fee. ~6-16 CAD sheets typical.
- Studio track record: 10+ years, 140+ executed plan packages, 99.4% first-time planning approval. Projects include a Grade II listed Victorian terrace glass pavilion in Hampstead (8-week Camden approval), a five-storey CLT urban infill in Shoreditch (Hackney planning, zero objections), and a Cotswolds modernist annex with oolitic limestone detailing.

Honesty guardrails: never invent statutes, fees, timelines, or approval outcomes. If asked beyond this context, say the studio would confirm in a free consultation and point the user to the on-site instant estimator (\"Get an instant estimate\" button) and the Contact page for a bespoke quote. Never claim guarantees beyond the studio's \"100% planning approval guarantee honored with free minor revisions if required by council officers\". Do not fabricate named staff, case studies, or client references beyond those listed. When asked to draft a design brief, produce a short structured brief (client, site/location, project type, approx. floor area, planning zone/constraints, structural & regs needs, preferred timeline, budget ballpark) the client can paste into the site's enquiry form. Never output markdown tables or code fences.`;

interface AskBody {
  message?: string;
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
      if (body.length > 10_000) {
        reject(new Error('PAYLOAD_TOO_LARGE'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function sendJson(res: ServerResponse, status: number, payload: Record<string, unknown>) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(payload));
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const pathname = (req.url || '').split('?')[0].replace(/\/+$/, '');
  if (req.method !== 'POST' || pathname !== '/api/ask') {
    sendJson(res, 405, { error: 'Method not allowed. Use POST /api/ask', code: 'METHOD_NOT_ALLOWED' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    sendJson(res, 503, {
      error: "The AI assistant isn't configured yet. Add a GEMINI_API_KEY environment variable in Vercel (Project -> Settings -> Environment Variables) to enable it.",
      code: 'MISSING_API_KEY',
    });
    return;
  }

  let body: AskBody;
  try {
    body = JSON.parse(await readBody(req)) as AskBody;
  } catch {
    sendJson(res, 400, { error: 'Invalid JSON body. Expected { "message": string }', code: 'INVALID_BODY' });
    return;
  }

  const message = (body.message || '').trim().slice(0, 2000);
  if (!message) {
    sendJson(res, 400, { error: 'Message is required', code: 'EMPTY_MESSAGE' });
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: message,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    const reply = response.text?.trim();
    if (!reply) {
      sendJson(res, 502, { error: 'The AI returned an empty response. Please try again.', code: 'EMPTY_RESPONSE' });
      return;
    }

    sendJson(res, 200, { reply });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    const isAuth = /API key|apiKey|PERMISSION_DENIED|UNAUTHENTICATED|invalid/i.test(msg);
    sendJson(res, isAuth ? 502 : 500, {
      error: isAuth
        ? 'The Gemini API key appears invalid or unauthorized. Check the key in Vercel and try again.'
        : 'Sorry — the AI assistant hit a technical snag. Please try again in a moment.',
      code: isAuth ? 'INVALID_API_KEY' : 'UPSTREAM_ERROR',
    });
  }
}