import React, { useState } from 'react';
import { CertificateRecord } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateRecord;
  onSendEmail: (email: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificate,
  onSendEmail,
}) => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      // Trigger a printable window or simple download simulation
      window.print();
    }, 800);
  };

  const handleEmailToGmail = () => {
    setIsEmailSent(true);
    onSendEmail(certificate.studentEmail);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-[#111111] border border-orange-500/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl shadow-orange-500/15 animate-fade-in-up">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <h3 className="text-lg font-black text-white">Verified Certificate of Completion</h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white text-xl">
            &times;
          </button>
        </div>

        {/* Certificate Canvas / Rendered Preview */}
        <div className="relative p-8 rounded-2xl bg-[#080808] border-2 border-orange-500/60 shadow-2xl text-center space-y-6 overflow-hidden">
          {/* Watermark Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl text-orange-500/5 select-none pointer-events-none font-black">
            NEXUS
          </div>

          <div className="space-y-1">
            <div className="text-xs uppercase tracking-widest text-orange-400 font-extrabold">NexusIntern Engineering Academy</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Certificate of Internship Completion
            </h2>
            <div className="h-0.5 w-24 bg-orange-500 mx-auto mt-2" />
          </div>

          <p className="text-xs text-neutral-400 italic">This is proudly presented to</p>

          <div className="text-2xl sm:text-3xl font-black text-white tracking-wide bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
            {certificate.studentName}
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
            for successfully completing the rigorous <strong>{certificate.duration}-Month Online Internship</strong> in{' '}
            <strong className="text-orange-400">{certificate.designation}</strong>{' '}
            {certificate.teamName ? `as part of the collaborative squad [${certificate.teamName}]` : 'under solo production track'}, 
            achieving all mandatory trainer code reviews, CI/CD pipeline deployments, and capstone defense.
          </p>

          <div className="pt-6 border-t border-neutral-800 grid grid-cols-2 text-xs">
            <div className="text-left space-y-1">
              <span className="text-[10px] text-neutral-500 uppercase">Verified Issue Date:</span>
              <div className="font-mono text-neutral-300">{certificate.issueDate}</div>
              <div className="text-[10px] text-green-400">Credential ID: {certificate.verificationCode}</div>
            </div>
            <div className="text-right space-y-1">
              <div className="font-serif italic text-sm text-orange-400">Dr. Sarah Jenkins</div>
              <div className="text-[10px] text-neutral-400">Senior Director of Engineering, NexusIntern</div>
            </div>
          </div>
        </div>

        {/* Actions: Download PDF & Email to Gmail */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex-1 py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs transition shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
            >
              {isDownloading ? 'Generating PDF...' : '📄 Download Certificate (PDF)'}
            </button>

            <button
              onClick={handleEmailToGmail}
              disabled={isEmailSent}
              className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                isEmailSent
                  ? 'border-green-500/50 bg-green-500/10 text-green-400'
                  : 'border-orange-500/40 bg-neutral-900 hover:bg-neutral-800 text-orange-300'
              }`}
            >
              {isEmailSent ? '✓ Emailed to ' + certificate.studentEmail : '✉️ Email PDF to ' + certificate.studentEmail}
            </button>
          </div>

          <p className="text-[11px] text-center text-neutral-500">
            A cryptographically signed copy and permanent verification link is also recorded in the Nexus Registry.
          </p>
        </div>

      </div>
    </div>
  );
};

