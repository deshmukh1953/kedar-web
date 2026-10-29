import React, { useState } from 'react';

interface ColorGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ColorGuideModal: React.FC<ColorGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const swatches = [
    {
      name: 'Electric Vivid Orange (Primary Brand)',
      hex: '#F97316',
      bgClass: 'bg-[#F97316]',
      role: 'Primary Nav, CTAs, 2-Month Core Track',
      textClass: 'text-orange-400',
    },
    {
      name: 'Deep Blaze Orange (6M Capstone)',
      hex: '#EA580C',
      bgClass: 'bg-[#EA580C]',
      role: 'Trainer Actions, 6-Month Capstone Tier',
      textClass: 'text-orange-500',
    },
    {
      name: 'Bright Neon Orange (1M Sprint)',
      hex: '#FB923C',
      bgClass: 'bg-[#FB923C]',
      role: 'Fast-Track 1-Month Sprint badge, Group highlights',
      textClass: 'text-orange-300',
    },
    {
      name: 'Deep Rust Orange (Admin Accent)',
      hex: '#C2410C',
      bgClass: 'bg-[#C2410C]',
      role: 'Admin Governance & Security Indicators',
      textClass: 'text-orange-600',
    },
    {
      name: 'Pitch Black (Pure Canvas)',
      hex: '#000000',
      bgClass: 'bg-[#000000] border-2 border-orange-500',
      role: 'Deep True Black Canvas Background',
      textClass: 'text-neutral-400',
    },
    {
      name: 'Carbon Black (Card Surfaces)',
      hex: '#0A0A0A',
      bgClass: 'bg-[#0A0A0A] border border-orange-500/40',
      role: 'Container Card Surfaces & Modals',
      textClass: 'text-neutral-400',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0A0A0A] border-2 border-orange-500 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto shadow-orange-500/30">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-orange-500/20 pb-3">
          <div>
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <span>🔥 NexusIntern Pure Orange & Black Palette</span>
            </h3>
            <p className="text-xs text-neutral-400">
              High-contrast, zero-distraction theme engineered exclusively with vivid orange and pure jet black.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-orange-400 text-lg font-bold p-1 rounded-lg"
          >
            &times;
          </button>
        </div>

        {/* Swatch Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {swatches.map((item) => (
            <div
              key={item.hex}
              onClick={() => handleCopy(item.hex)}
              className="p-3 rounded-xl bg-black border border-orange-500/20 cursor-pointer hover:border-orange-500 transition group relative"
              title="Click to copy Hex code"
            >
              <div className={`w-full h-10 rounded-lg ${item.bgClass} mb-2 shadow-inner transition transform group-hover:scale-[1.02]`} />
              <div className="text-[11px] font-bold text-white truncate">{item.name}</div>
              <div className="text-[10px] text-neutral-400 font-mono flex items-center justify-between mt-0.5">
                <span>{item.hex}</span>
                <span className="text-[9px] text-orange-400 opacity-0 group-hover:opacity-100 transition font-bold">
                  {copiedHex === item.hex ? 'Copied!' : 'Copy'}
                </span>
              </div>
              <div className={`text-[9px] mt-1 truncate ${item.textClass}`}>{item.role}</div>
            </div>
          ))}
        </div>

        {/* Duration Track Color Semantics */}
        <div className="p-4 rounded-xl bg-black border border-orange-500/20 space-y-2">
          <h4 className="text-xs font-semibold text-orange-400">Internship Duration Tracks (All Orange & Black)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-[#0A0A0A] border border-orange-500/30 text-orange-300">
              <strong className="block text-white">1 Month Sprint</strong>
              <span className="text-[11px] text-neutral-400">Bright Orange (#FB923C). Rapid sprint commits.</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0A0A0A] border border-orange-500 text-orange-400">
              <strong className="block text-white">2 Months Core</strong>
              <span className="text-[11px] text-neutral-400">Vivid Orange (#F97316). Deep full-stack PRs.</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0A0A0A] border border-orange-600/50 text-orange-400">
              <strong className="block text-white">6 Months Capstone</strong>
              <span className="text-[11px] text-neutral-400">Blaze Orange (#EA580C). Cloud architecture.</span>
            </div>
          </div>
        </div>

        {/* Code Diff Tokens */}
        <div className="p-4 rounded-xl bg-black border border-orange-500/20 space-y-2">
          <h4 className="text-xs font-semibold text-orange-400">Code Verification Semantics</h4>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-orange-500/15 border-l-2 border-orange-500 text-orange-400">
              + Verified / Added Line (#F97316)
            </div>
            <div className="p-2 rounded-lg bg-red-500/15 border-l-2 border-red-500 text-red-400">
              - Removed / Deprecated (#EF4444)
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-black text-xs transition"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
