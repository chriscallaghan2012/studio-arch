import React, { useState } from 'react';
import { Upload, CheckCircle2, FileText, Send, Clock, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

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
      const generatedRef = `MA-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedRef(generatedRef);
      if (onSuccess) onSuccess();
    }, 1200);
  };

  return (
    <div className="bg-ivory border border-white/10 shadow-xl overflow-hidden font-sans">
      {/* Title Block Header */}
      <div className="bg-ink-soft text-white px-5 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
        <div className="flex items-center space-x-3">
          <span className="bg-brass text-black px-2 py-0.5 font-bold">
            ENQUIRY — 001
          </span>
          <span className="text-white/70 font-bold tracking-wider">
            PROJECT ENQUIRY
          </span>
        </div>
        <div className="flex items-center space-x-4 text-[11px] text-stone">
          <span className="text-brass-light font-sans">REVIEWED BY A DIRECTOR</span>
          <span className="text-stone">|</span>
          <span>RESPONSE WITHIN 4 HOURS</span>
        </div>
      </div>

      {submittedRef ? (
        <div className="p-8 sm:p-12 text-center space-y-6 bg-white">
          <div className="w-16 h-16 bg-sage/15 text-sage border border-sage rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          
          <div className="space-y-2 max-w-md mx-auto">
            <span className="text-xs font-sans text-stone uppercase tracking-widest">
              ENQUIRY RECEIVED
            </span>
            <h3 className="text-2xl font-bold text-ink font-display">
              Thank You
            </h3>
            <p className="text-sm text-stone font-sans">
              Your enquiry has been received and will be reviewed personally by a director.
            </p>
          </div>

          <div className="p-4 bg-hairline/60 border border-hairline font-sans text-xs max-w-sm mx-auto text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-stone">YOUR REFERENCE:</span>
              <span className="font-bold text-brass">{submittedRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone">STUDIO:</span>
              <span className="font-bold text-ink">The Mayfair Studio</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone">NEXT STEPS:</span>
              <span className="font-bold text-ink">We will be in touch within four working hours</span>
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
            className="px-6 py-2.5 bg-ink text-white font-sans text-xs font-bold hover:bg-ink-soft transition-colors"
          >
            SUBMIT ANOTHER PROJECT ENQUIRY
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* Section 01: Client Contact Metadata */}
          <div>
            <div className="border-b border-hairline pb-2 mb-4 flex items-center justify-between">
              <h4 className="text-xs font-sans font-bold text-ink uppercase tracking-wider flex items-center space-x-2">
                <span className="text-brass">01.</span>
                <span>CLIENT & CONTACT INFORMATION</span>
              </h4>
              <span className="text-[10px] font-sans text-stone">* REQUIRED FIELDS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-sans text-stone uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Davies"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-white border border-hairline text-ink px-3 py-2 text-xs font-sans focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans text-stone uppercase mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. eleanor@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-hairline text-ink px-3 py-2 text-xs font-sans focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans text-stone uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+44 (0) 7..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-hairline text-ink px-3 py-2 text-xs font-sans focus:outline-none focus:border-ink"
                />
              </div>
            </div>
          </div>

          {/* Section 02: Site & Property Details */}
          <div>
            <div className="border-b border-hairline pb-2 mb-4">
              <h4 className="text-xs font-sans font-bold text-ink uppercase tracking-wider flex items-center space-x-2">
                <span className="text-brass">02.</span>
                <span>SITE LOCATION & PARAMETERS</span>
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-sans text-stone uppercase mb-1">
                  Site Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 42 Well Walk, Hampstead"
                  value={formData.siteAddress}
                  onChange={(e) => setFormData({ ...formData, siteAddress: e.target.value })}
                  className="w-full bg-white border border-hairline text-ink px-3 py-2 text-xs font-sans focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans text-stone uppercase mb-1">
                  Postcode / Borough *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NW3 1BX"
                  value={formData.postcode}
                  onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  className="w-full bg-white border border-hairline text-ink px-3 py-2 text-xs font-sans focus:outline-none focus:border-ink"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-[11px] font-sans text-stone uppercase mb-1">
                  Project Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full bg-white border border-hairline text-ink px-3 py-2 text-xs font-sans focus:outline-none focus:border-ink"
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
                <label className="block text-[11px] font-sans text-stone uppercase mb-1">
                  Anticipated Construction Budget
                </label>
                <select
                  value={formData.targetBudget}
                  onChange={(e) => setFormData({ ...formData, targetBudget: e.target.value })}
                  className="w-full bg-white border border-hairline text-ink px-3 py-2 text-xs font-sans focus:outline-none focus:border-ink"
                >
                  <option>£30k - £60k (Minor Extension / Loft)</option>
                  <option>£60k - £120k (Full Extension)</option>
                  <option>£120k - £250k (Major Remodel)</option>
                  <option>£250k - £600k+ (Substantial / New Build)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-sans text-stone uppercase mb-1">
                  Target Survey Date
                </label>
                <select
                  value={formData.timeframe}
                  onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                  className="w-full bg-white border border-hairline text-ink px-3 py-2 text-xs font-sans focus:outline-none focus:border-ink"
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
            <div className="border-b border-hairline pb-2 mb-3">
              <h4 className="text-xs font-sans font-bold text-ink uppercase tracking-wider flex items-center space-x-2">
                <span className="text-brass">03.</span>
                <span>REQUIRED TECHNICAL DISCIPLINES</span>
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-sans">
              {[
                { id: 'scopeSurvey', label: '3D Laser Survey' },
                { id: 'scopePlanning', label: 'Planning Submission' },
                { id: 'scopeBuildingRegs', label: 'Building Regs (Pt A-S)' },
                { id: 'scopeStructural', label: 'Structural Steel Calcs' },
                { id: 'scope3D', label: '3D Photoreal Render' }
              ].map((item) => (
                <label
                  key={item.id}
                  className="flex items-center space-x-2 p-2 bg-white border border-hairline cursor-pointer hover:bg-ivory"
                >
                  <input
                    type="checkbox"
                    checked={(formData as any)[item.id]}
                    onChange={(e) =>
                      setFormData({ ...formData, [item.id]: e.target.checked })
                    }
                    className="w-3.5 h-3.5 text-brass rounded focus:ring-0"
                  />
                  <span className="text-[11px] text-ink">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 04: Project Brief & File Upload */}
          <div>
            <div className="border-b border-hairline pb-2 mb-3">
              <h4 className="text-xs font-sans font-bold text-ink uppercase tracking-wider flex items-center space-x-2">
                <span className="text-brass">04.</span>
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
                className="w-full bg-white border border-hairline text-ink p-3 text-xs font-sans focus:outline-none focus:border-ink"
              />

              {/* Drag & Drop File Intake Zone */}
              <div className="border border-dashed border-stone p-4 text-center bg-hairline hover:bg-hairline/60 transition-colors relative">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png,.zip"
                />
                <div className="flex flex-col items-center justify-center space-y-1">
                  <Upload className="w-5 h-5 text-stone" />
                  <span className="text-xs font-sans font-bold text-ink">
                    CHOOSE FILES TO ATTACH
                  </span>
                  <span className="text-[10px] font-sans text-stone">
                    Sketches, drawings &amp; site photos (PDF, DWG, JPG — up to 50 MB)
                  </span>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-sans text-stone uppercase">
                    ATTACHED FILES ({uploadedFiles.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {uploadedFiles.map((fn, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 bg-white border border-hairline text-[11px] font-sans text-stone"
                      >
                        <FileText className="w-3 h-3 mr-1 text-brass" />
                        {fn}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submission Bar */}
          <div className="pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-[11px] font-sans text-stone">
              <ShieldCheck className="w-4 h-4 text-sage" />
              <span>Your details are held in strict confidence.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-ink hover:bg-ink-soft text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>SENDING YOUR ENQUIRY…</span>
                </>
              ) : (
                <>
                  <span>SEND ENQUIRY</span>
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
