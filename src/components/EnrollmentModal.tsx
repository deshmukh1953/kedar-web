import React, { useState } from 'react';
import { DurationType, EnrollmentFormData } from '../types';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteEnrollment: (data: EnrollmentFormData) => void;
  initialDuration?: DurationType;
  initialModality?: 'individual' | 'group';
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  onCompleteEnrollment,
  initialDuration = 2,
  initialModality = 'individual',
}) => {
  const [modality, setModality] = useState<'individual' | 'group'>(initialModality);
  const [duration, setDuration] = useState<DurationType>(initialDuration);
  const [fullName, setFullName] = useState('Aarav Sharma');
  const [email, setEmail] = useState('aarav.sharma@nexusintern.io');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCompleteEnrollment({
      fullName,
      email,
      collegeOrCompany: 'University / Tech',
      trackModality: modality,
      durationMonths: duration,
      specialization: 'Full-Stack Cloud Architecture',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#121212] border border-orange-500/30 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl shadow-orange-500/10 animate-fade-in-up">
        
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <h3 className="text-base font-bold text-white">Enroll in Internship Track</h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white text-xl hover:rotate-90 transition-transform">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Modality */}
          <div>
            <label className="block text-neutral-400 mb-1.5 font-medium">Modality</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setModality('individual')}
                className={`py-2 px-3 rounded border text-center font-medium transition ${
                  modality === 'individual'
                    ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                    : 'border-neutral-800 text-neutral-400'
                }`}
              >
                Solo Intern
              </button>
              <button
                type="button"
                onClick={() => setModality('group')}
                className={`py-2 px-3 rounded border text-center font-medium transition ${
                  modality === 'group'
                    ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                    : 'border-neutral-800 text-neutral-400'
                }`}
              >
                Squad Track
              </button>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-neutral-400 mb-1.5 font-medium">Duration</label>
            <div className="grid grid-cols-3 gap-2">
              {([1, 2, 6] as DurationType[]).map((dur) => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => setDuration(dur)}
                  className={`py-2 px-2 rounded border text-center font-medium transition ${
                    duration === dur
                      ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                      : 'border-neutral-800 text-neutral-400'
                  }`}
                >
                  {dur} Month{dur > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div>
            <label className="block text-neutral-400 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded bg-orange-500 hover:bg-orange-400 text-black font-semibold transition"
            >
              Complete Enrollment
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
