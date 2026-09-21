import type { IncomingMessage, ServerResponse } from 'node:http';

/**
 * Shared helpers for Vercel serverless functions in this project
 * (raw-node handler style: export default async function handler(req, res)).
 */
export function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
      if (body.length > 100_000) {
        reject(new Error('PAYLOAD_TOO_LARGE'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

export function sendJson(res: ServerResponse, status: number, payload: Record<string, unknown>) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(payload));
}

export function methodNotAllowed(res: ServerResponse, allow: string) {
  sendJson(res, 405, { error: `Method not allowed. Use ${allow}`, code: 'METHOD_NOT_ALLOWED' });
}