import React, { useState } from 'react';
import { RoleType, DurationType, ModalityType } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (userData: {
    role: RoleType;
    email: string;
    name: string;
    modality: ModalityType;
    designation: string;
    duration: DurationType;
  }) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<RoleType>('student');
  const [modality, setModality] = useState<ModalityType>('individual');
  const [designation, setDesignation] = useState('Full-Stack Developer');
  const [duration, setDuration] = useState<DurationType>(2);

  // Form Fields
  const [name, setName] = useState('Aarav Sharma');
  const [email, setEmail] = useState('aarav.sharma@gmail.com');
  const [password, setPassword] = useState('••••••••');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccessLogin({
      role,
      email,
      name,
      modality,
      designation,
      duration,
    });
    onClose();
  };

  const handleRolePreset = (selectedRole: RoleType) => {
    setRole(selectedRole);
    if (selectedRole === 'student') {
      setEmail('aarav.sharma@gmail.com');
      setName('Aarav Sharma');
    } else if (selectedRole === 'trainer') {
      setEmail('sarah.jenkins@nexusintern.io');
      setName('Dr. Sarah Jenkins');
    } else if (selectedRole === 'admin') {
      setEmail('admin@nexusintern.io');
      setName('Head Administrator');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-[#111111] border border-orange-500/30 rounded-2xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl shadow-orange-500/10 animate-fade-in-up">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <h3 className="text-base font-extrabold text-white">
              {activeTab === 'login' ? 'Sign In to Nexus Portal' : 'Register New Student Profile'}
            </h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white text-xl hover:rotate-90 transition-transform">
            &times;
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`py-2 rounded-lg transition ${
              activeTab === 'login' ? 'bg-orange-500 text-black shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setRole('student');
            }}
            className={`py-2 rounded-lg transition ${
              activeTab === 'register' ? 'bg-orange-500 text-black shadow-md' : 'text-neutral-400 hover:text-white'
            }`}
          >
            New Student Register
          </button>
        </div>

        {/* Role selector for Login */}
        {activeTab === 'login' && (
          <div>
            <label className="block text-neutral-400 mb-1.5 text-xs font-semibold">Select Login Portal Role:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'student' as RoleType, label: '👨‍💻 Student', desc: 'Intern Hub' },
                { id: 'trainer' as RoleType, label: '🔍 Trainer', desc: 'Reviewer' },
                { id: 'admin' as RoleType, label: '⚡ Admin', desc: 'Ops & Plans' },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleRolePreset(r.id)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    role === r.id
                      ? 'border-orange-500 bg-orange-500/15 text-orange-400'
                      : 'border-neutral-800 bg-[#141414] text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-xs font-bold">{r.label}</div>
                  <div className="text-[10px] text-neutral-500">{r.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {activeTab === 'register' && (
            <>
              <div>
                <label className="block text-neutral-400 mb-1 font-semibold">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Mode: Individual vs Group */}
              <div>
                <label className="block text-neutral-400 mb-1 font-semibold">Internship Modality</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setModality('individual')}
                    className={`py-2 rounded-xl border font-bold text-center transition ${
                      modality === 'individual'
                        ? 'border-orange-500 bg-orange-500/15 text-orange-400'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                    }`}
                  >
                    👤 Individual Solo
                  </button>
                  <button
                    type="button"
                    onClick={() => setModality('group')}
                    className={`py-2 rounded-xl border font-bold text-center transition ${
                      modality === 'group'
                        ? 'border-orange-500 bg-orange-500/15 text-orange-400'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                    }`}
                  >
                    👥 Group Squad (Up to 5)
                  </button>
                </div>
              </div>

              {/* Designation */}
              <div>
                <label className="block text-neutral-400 mb-1 font-semibold">Choose Designation</label>
                <select
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Full-Stack Developer">Full-Stack Developer (MERN / Next.js)</option>
                  <option value="Backend Architect">Backend Architect (Node / Go / Postgres)</option>
                  <option value="DevOps & Cloud Engineer">DevOps & Cloud Engineer (Docker / K8s / AWS)</option>
                  <option value="AI & Machine Learning Engineer">AI & Machine Learning Engineer (Python / PyTorch)</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-neutral-400 mb-1 font-semibold">Duration Plan</label>
                <div className="grid grid-cols-3 gap-2">
                  {([1, 2, 6] as DurationType[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`py-1.5 rounded-xl border font-bold text-center transition ${
                        duration === d
                          ? 'border-orange-500 bg-orange-500 text-black'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                      }`}
                    >
                      {d} Month{d > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-neutral-400 mb-1 font-semibold">
              {role === 'student' ? "Student's Gmail / Email Address" : 'Work Email Address'}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1 font-semibold">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs transition shadow-md shadow-orange-500/25"
            >
              {activeTab === 'login' ? `Sign In as ${role.toUpperCase()}` : 'Register & Start Assessment →'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
