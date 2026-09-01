import React, { useState } from 'react';
import { Upload, CheckCircle2, FileText, Send, Clock, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TitleBlockEnquiryFormProps {
  initialBrief?: string;
  onSuccess?: () => void;
}

export const TitleBlockEnquiryForm: React.FC<TitleBlockEnquiryFormProps> = ({
  initialBrief = '',
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    siteAddress: '',
    postcode: '',
    projectType: 'Home Extension',
    targetBudget: '£50k - £100k',
    timeframe: 'Immediate (< 1 Month)',
    description: initialBrief || '',
    scopeSurvey: true,
    scopePlanning: true,
    scopeBuildingRegs: true,
    scopeStructural: true,
    scope3D: false
  });

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file: File) => file.name);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedRef = `SA-ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedRef(generatedRef);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (onSuccess) onSuccess();
    }, 1200);
  };

  return (
    <div className="bg-[#F4F2ED] border-2 border-slate-700 shadow-xl overflow-hidden font-sans">
      {/* Title Block Header */}
      <div className="bg-[#001733] text-white px-5 py-3 border-b-2 border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center space-x-3">
          <span className="bg-sky-500 text-black px-2 py-0.5 font-bold">
            DOC_REF: ENQ-001 // INITIATE
          </span>
          <span className="text-slate-300 font-bold tracking-wider">
            PROJECT ENQUIRY & DRAFTING INTAKE
          </span>
        </div>
        <div className="flex items-center space-x-4 text-[11px] text-slate-400">
          <span className="text-emerald-400 font-mono">DISPATCH: ACTIVE_QUEUE</span>
          <span className="text-slate-600">|</span>
          <span>RESPONSE SLA: &lt; 4 HOURS</span>
        </div>
      </div>

      {submittedRef ? (
        <div className="p-8 sm:p-12 text-center space-y-6 bg-white">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 border-2 border-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          
          <div className="space-y-2 max-w-md mx-auto">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
              ENQUIRY_DISPATCH_CONFIRMED
            </span>
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              Project Brief Registered
            </h3>
            <p className="text-sm text-slate-600 font-mono">
              Your architectural drafting brief has been allocated to a Lead Chartered Architect.
            </p>
          </div>

          <div className="p-4 bg-slate-100 border border-slate-300 font-mono text-xs max-w-sm mx-auto text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">ASSIGNED REF:</span>
              <span className="font-bold text-sky-900">{submittedRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">SURVEY LEAD:</span>
              <span className="font-bold text-slate-800">London Central Studio</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">TARGET TIMELINE:</span>
              <span className="font-bold text-slate-800">Review within 4 hrs</span>
            </div>
          </div>

          <button
            onClick={() => {
              setSubmittedRef(null);
              setFormData({
                ...formData,
                description: ''
              });
            }}
            className="px-6 py-2.5 bg-[#001f3f] text-white font-mono text-xs font-bold hover:bg-[#002b49] transition-colors"
          >
            SUBMIT ANOTHER PROJECT INQUIRY
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* Section 01: Client Contact Metadata */}
          <div>
            <div className="border-b border-slate-300 pb-2 mb-4 flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <span className="text-sky-700">[01]</span>
                <span>CLIENT & CONTACT INFORMATION</span>
              </h4>
              <span className="text-[10px] font-mono text-slate-500">* REQUIRED FIELDS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-700 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Davies"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-white border border-slate-300 text-slate-900 px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#001f3f]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-700 uppercase mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. eleanor@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-slate-300 text-slate-900 px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#001f3f]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-700 uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+44 (0) 7..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-slate-300 text-slate-900 px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#001f3f]"
                />
              </div>
            </div>
          </div>

          {/* Section 02: Site & Property Details */}
          <div>
            <div className="border-b border-slate-300 pb-2 mb-4">
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <span className="text-sky-700">[02]</span>
                <span>SITE LOCATION & PARAMETERS</span>
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-mono text-slate-700 uppercase mb-1">
                  Site Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 42 Well Walk, Hampstead"
                  value={formData.siteAddress}
                  onChange={(e) => setFormData({ ...formData, siteAddress: e.target.value })}
                  className="w-full bg-white border border-slate-300 text-slate-900 px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#001f3f]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-700 uppercase mb-1">
                  Postcode / Borough *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NW3 1BX"
                  value={formData.postcode}
                  onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  className="w-full bg-white border border-slate-300 text-slate-900 px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#001f3f]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-700 uppercase mb-1">
                  Project Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full bg-white border border-slate-300 text-slate-900 px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#001f3f]"
                >
                  <option>Home Extension (Single / Multi Storey)</option>
                  <option>Loft Conversion / Mansard</option>
                  <option>New Build Detached / Terrace</option>
                  <option>Commercial Fit-Out / Change of Use</option>
                  <option>Basement Subterranean Extension</option>
                  <option>Conservation / Listed Building Consent</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-700 uppercase mb-1">
                  Anticipated Construction Budget
                </label>
                <select
                  value={formData.targetBudget}
                  onChange={(e) => setFormData({ ...formData, targetBudget: e.target.value })}
                  className="w-full bg-white border border-slate-300 text-slate-900 px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#001f3f]"
                >
                  <option>£30k - £60k (Minor Extension / Loft)</option>
                  <option>£60k - £120k (Full Extension)</option>
                  <option>£120k - £250k (Major Remodel)</option>
                  <option>£250k - £600k+ (Substantial / New Build)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-700 uppercase mb-1">
                  Target Survey Date
                </label>
                <select
                  value={formData.timeframe}
                  onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                  className="w-full bg-white border border-slate-300 text-slate-900 px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#001f3f]"
                >
                  <option>Immediate (&lt; 14 Days)</option>
                  <option>Within 1 Month</option>
                  <option>Within 2 - 3 Months</option>
                  <option>Feasibility / Exploratory</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 03: Required Scope Toggles */}
          <div>
            <div className="border-b border-slate-300 pb-2 mb-3">
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <span className="text-sky-700">[03]</span>
                <span>REQUIRED TECHNICAL DISCIPLINES</span>
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
              {[
                { id: 'scopeSurvey', label: '3D Laser Survey' },
                { id: 'scopePlanning', label: 'Planning Submission' },
                { id: 'scopeBuildingRegs', label: 'Building Regs (Pt A-S)' },
                { id: 'scopeStructural', label: 'Structural Steel Calcs' },
                { id: 'scope3D', label: '3D Photoreal Render' }
              ].map((item) => (
                <label
                  key={item.id}
                  className="flex items-center space-x-2 p-2 bg-white border border-slate-300 cursor-pointer hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={(formData as any)[item.id]}
                    onChange={(e) =>
                      setFormData({ ...formData, [item.id]: e.target.checked })
                    }
                    className="w-3.5 h-3.5 text-[#001f3f] rounded focus:ring-0"
                  />
                  <span className="text-[11px] text-slate-800">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 04: Project Brief & File Upload */}
          <div>
            <div className="border-b border-slate-300 pb-2 mb-3">
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <span className="text-sky-700">[04]</span>
                <span>PROJECT BRIEF & EXISTING DRAWINGS</span>
              </h4>
            </div>

            <div className="space-y-3">
              <textarea
                rows={4}
                required
                placeholder="Describe your design aspirations, space goals (e.g., open-plan kitchen diner, roof lantern, sliding pocket doors), and any known planning conditions..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-white border border-slate-300 text-slate-900 p-3 text-xs font-mono focus:outline-none focus:border-[#001f3f]"
              />

              {/* Drag & Drop File Intake Zone */}
              <div className="border-2 border-dashed border-slate-400 p-4 text-center bg-slate-100/60 hover:bg-slate-100 transition-colors relative">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png,.zip"
                />
                <div className="flex flex-col items-center justify-center space-y-1">
                  <Upload className="w-5 h-5 text-slate-600" />
                  <span className="text-xs font-mono font-bold text-slate-800">
                    CLICK TO UPLOAD OR DRAG & DROP
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Existing Sketches, Estate Agent Plans, Site Photos (PDF, DWG, JPG up to 50MB)
                  </span>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    ATTACHED FILES ({uploadedFiles.length}):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {uploadedFiles.map((fn, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 bg-white border border-slate-300 text-[11px] font-mono text-slate-700"
                      >
                        <FileText className="w-3 h-3 mr-1 text-sky-700" />
                        {fn}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submission Bar */}
          <div className="pt-4 border-t border-slate-300 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Strict Privacy: NDA Protected &amp; Direct Chartered Architect Review</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-[#001f3f] hover:bg-[#002b49] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>TRANSMITTING BRIEF...</span>
                </>
              ) : (
                <>
                  <span>DISPATCH PROJECT BRIEF</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

        </form>
      )}
    </div>
  );
};
