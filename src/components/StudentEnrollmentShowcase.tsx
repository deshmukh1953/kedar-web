import React, { useState } from 'react';
import { DurationType, RoleType, ModalityType } from '../types';

interface StudentEnrollmentShowcaseProps {
  onOpenRegisterModal: () => void;
  onOpenAssessment: () => void;
  onSelectRole: (role: RoleType) => void;
  onSelectDuration: (duration: DurationType) => void;
}

export const StudentEnrollmentShowcase: React.FC<StudentEnrollmentShowcaseProps> = ({
  onOpenRegisterModal,
  onOpenAssessment,
  onSelectRole,
  onSelectDuration,
}) => {
  const [activeModality, setActiveModality] = useState<ModalityType>('individual');

  const tracks = [
    {
      months: 1 as DurationType,
      title: 'Fast-Track Sprint',
      weeks: '4 Weeks Intensive',
      desc: 'Build & deploy production REST APIs, master clean Git branching workflows, and implement cloud serverless deployments.',
      badge: 'Sprint Track',
      popular: false,
      highlights: ['4 Guided PRs', 'Docker Basics', '1-on-1 Code Review', 'Verified Certificate'],
      icon: '⚡',
    },
    {
      months: 2 as DurationType,
      title: 'Full-Stack Architecture',
      weeks: '8 Weeks Core',
      desc: 'Deep relational modeling, Redis atomic caching, CI/CD automated test pipelines, and mentor recommendation letters.',
      badge: 'Most Popular',
      popular: true,
      highlights: ['8 Guided PRs', 'Redis & Postgres', 'CI/CD Pipelines', 'Trainer Recommendation'],
      icon: '🚀',
    },
    {
      months: 6 as DurationType,
      title: 'Industrial Capstone',
      weeks: '24 Weeks Production',
      desc: 'Kubernetes orchestration, distributed event streaming, live architecture defense, and priority placement referrals.',
      badge: 'Career Placement',
      popular: false,
      highlights: ['24 Sprint Milestones', 'K8s & Microservices', 'Live Architecture Defense', 'Hiring Network Referrals'],
      icon: '🏆',
    },
  ];

  return (
    <div className="space-y-16 pb-12 animate-fade-in">
      
      {/* Hero Section */}
      <section className="relative text-center py-16 md:py-24 px-4 overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-b from-[#14100c] via-[#0d0d0d] to-[#080808]">
        {/* Ambient background glow with animation */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />
        <div className="absolute top-12 left-10 w-48 h-48 bg-orange-600/5 rounded-full blur-2xl pointer-events-none animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-semibold tracking-wide uppercase transition hover:scale-105 cursor-default">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            Winter / Spring 2026 Batch • Complete Blueprint Flow Enabled
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] animate-fade-in-up">
            Code. Get Reviewed. <br />
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-300 bg-clip-text text-transparent">
              Earn Verified Engineering Credentials.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Follow the complete end-to-end internship blueprint: Register → Designation → 15-Question Assessment → Scholarship Discount → 
            Task Delivery → GitHub PR + Description + Screenshot submission → Trainer Approval → PDF Certificate emailed directly to your Gmail.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenRegisterModal}
              className="px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-sm transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 flex items-center gap-2 group"
            >
              <span>Register & Take 15-Question Assessment</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button
              onClick={() => onSelectRole('trainer')}
              className="px-6 py-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 text-sm font-semibold border border-neutral-700/80 transition-all duration-200 hover:border-orange-500/50 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Trainer Review Console</span>
            </button>
          </div>

          {/* Social proof stats */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-neutral-800/80 mt-8 text-center">
            <div className="p-3 transition-transform hover:-translate-y-1">
              <div className="text-2xl font-black text-orange-400">1,400+</div>
              <div className="text-xs text-neutral-400 mt-0.5">Students Placed</div>
            </div>
            <div className="p-3 transition-transform hover:-translate-y-1">
              <div className="text-2xl font-black text-white">48 Hrs</div>
              <div className="text-xs text-neutral-400 mt-0.5">Max Review Turnaround</div>
            </div>
            <div className="p-3 transition-transform hover:-translate-y-1">
              <div className="text-2xl font-black text-orange-400">Up to 40%</div>
              <div className="text-xs text-neutral-400 mt-0.5">Assessment Discount</div>
            </div>
            <div className="p-3 transition-transform hover:-translate-y-1">
              <div className="text-2xl font-black text-white">100%</div>
              <div className="text-xs text-neutral-400 mt-0.5">PR + Screenshot Checks</div>
            </div>
          </div>
        </div>
      </section>

      {/* 17. End-to-End Workflow Diagram */}
      <section className="p-8 rounded-2xl bg-[#0f0f0f] border border-orange-500/30 space-y-6 shadow-2xl">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Architectural Blueprint</span>
          <h3 className="text-2xl font-extrabold text-white">Complete End-to-End Internship Flow</h3>
          <p className="text-xs text-neutral-400">
            Strict verification pipeline guaranteeing authentic engineering work before certificate unlock.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Individual Flow */}
          <div className="p-5 rounded-xl border border-neutral-800 bg-[#141414] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <h4 className="text-sm font-bold text-orange-400 flex items-center gap-2">
                <span>👤</span> Individual Track Flow
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-mono">Solo Intern</span>
            </div>
            <div className="space-y-2 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <span className="text-orange-400 font-bold">1.</span>
                <span><strong>Register & Profile:</strong> Choose Designation & Duration (1, 2, or 6 Months).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-400 font-bold">2.</span>
                <span><strong>15-Question Assessment:</strong> Complete technical evaluation and calculate scholarship discount.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-400 font-bold">3.</span>
                <span><strong>Plan Selection & Payment:</strong> Discount applied instantly to unlock Task 1.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-400 font-bold">4.</span>
                <span><strong>Evidence Submission:</strong> Push code to GitHub, submit Screenshot + Description + GitHub PR Link.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-400 font-bold">5.</span>
                <span><strong>Trainer Review:</strong> Line-by-line inspection, approval or requested revisions.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-400 font-bold">6.</span>
                <span><strong>Certification & Gmail:</strong> Unlock certificate, generate signed PDF, and email to student's Gmail.</span>
              </div>
            </div>
          </div>

          {/* Group Flow */}
          <div className="p-5 rounded-xl border border-neutral-800 bg-[#141414] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <h4 className="text-sm font-bold text-orange-400 flex items-center gap-2">
                <span>👥</span> Group Track Flow (Max 5 Members)
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-mono">Squad Track</span>
            </div>
            <div className="space-y-2 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <span className="text-orange-400 font-bold">1.</span>
                <span><strong>Team Lead Setup:</strong> Creates squad, selects shared project, invites up to 4 peers.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-400 font-bold">2.</span>
                <span><strong>Shared Repository:</strong> Squad collaborates on dedicated GitHub repo with branch PR workflows.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-400 font-bold">3.</span>
                <span><strong>Team Submission:</strong> Any member submits Screenshots + Description + GitHub Link for team task.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-400 font-bold">4.</span>
                <span><strong>Trainer Review:</strong> Trainer verifies team PR and approves sprint milestone.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-400 font-bold">5.</span>
                <span><strong>Eligibility Check:</strong> System verifies each member's contributions and active status.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-400 font-bold">6.</span>
                <span><strong>Individual Certificates:</strong> Distinct signed PDF issued & emailed to each eligible member.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Duration Cards */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Duration Options</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Choose Your Internship Duration</h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Available in 1, 2, or 6 months for Solo and Squad modalities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tracks.map((t, idx) => (
            <div
              key={t.months}
              style={{ animationDelay: `${idx * 150}ms` }}
              className={`relative p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl animate-fade-in-up group ${
                t.popular
                  ? 'bg-gradient-to-b from-[#18130e] to-[#0f0f0f] border-orange-500 shadow-xl shadow-orange-500/15 animate-shimmer'
                  : 'bg-[#101010] border-neutral-800 hover:border-orange-500/50 hover:bg-[#141414] hover:shadow-orange-500/10'
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-orange-500 text-black font-extrabold text-[11px] tracking-wide uppercase shadow-md shadow-orange-500/30">
                  {t.badge}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl group-hover:scale-125 transition-transform duration-300 inline-block">{t.icon}</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-neutral-800 text-orange-300 border border-neutral-700">
                    {t.weeks}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">{t.title}</h3>
                  <div className="text-2xl font-black text-orange-400 mt-1">
                    {t.months} Month{t.months > 1 ? 's' : ''}
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">{t.desc}</p>

                {/* Highlights */}
                <div className="space-y-2 pt-2 border-t border-neutral-800/80">
                  {t.highlights.map((h, i) => (
                    <div key={i} className="flex items-center text-xs text-neutral-300 gap-2">
                      <span className="text-orange-400 font-bold">✓</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    onSelectDuration(t.months);
                    onOpenRegisterModal();
                  }}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98] ${
                    t.popular
                      ? 'bg-orange-500 hover:bg-orange-400 text-black shadow-orange-500/30 hover:shadow-orange-500/50'
                      : 'bg-neutral-800 hover:bg-orange-500 hover:text-black text-white border border-neutral-700 hover:border-orange-500'
                  }`}
                >
                  Enroll in {t.months}-Month Track
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
