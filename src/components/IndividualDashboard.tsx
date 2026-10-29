import React from 'react';
import { UserProfile, TaskItem, CertificateRecord } from '../types';

interface IndividualDashboardProps {
  userProfile: UserProfile;
  tasks: TaskItem[];
  onOpenTaskSubmit: (task: TaskItem) => void;
  onOpenAssessment: () => void;
  onOpenPayment: () => void;
  onViewCertificate: (cert: CertificateRecord) => void;
  certificate?: CertificateRecord | null;
}

export const IndividualDashboard: React.FC<IndividualDashboardProps> = ({
  userProfile,
  tasks,
  onOpenTaskSubmit,
  onOpenAssessment,
  onOpenPayment,
  onViewCertificate,
  certificate,
}) => {
  const approvedCount = tasks.filter((t) => t.status === 'approved').length;
  const isAllApproved = approvedCount === tasks.length;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner with Step Roadmap */}
      <div className="p-6 rounded-2xl border border-orange-500/30 bg-gradient-to-r from-[#18130e] via-[#121212] to-[#0d0d0d] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-400 font-bold border border-orange-500/30">
                Solo Intern Track
              </span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-300 font-semibold">{userProfile.duration} Month Duration</span>
              <span className="text-neutral-500">•</span>
              <span className="text-white font-bold">{userProfile.designation}</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1 tracking-tight">
              Welcome, {userProfile.name}
            </h2>
            <p className="text-xs text-neutral-400">
              Student Gmail: <span className="font-mono text-neutral-200">{userProfile.email}</span>
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-right min-w-[150px]">
            <div className="text-[11px] text-neutral-400">Mandatory Tasks Passed</div>
            <div className="text-lg font-black text-orange-400 mt-0.5">
              {approvedCount} / {tasks.length} Completed
            </div>
          </div>
        </div>

        {/* 6-Step Visual Progression Tracker */}
        <div className="pt-2 border-t border-neutral-800/80">
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-[11px]">
            <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 font-semibold">
              ✓ 1. Register
            </div>
            <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 font-semibold">
              ✓ 2. Profile & Role
            </div>
            <div className={`p-2 rounded-lg border font-semibold ${
              userProfile.assessmentTaken
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-orange-500/15 border-orange-500/40 text-orange-300 animate-pulse'
            }`}>
              {userProfile.assessmentTaken ? `✓ 3. Quiz (${userProfile.assessmentScore}/15)` : '3. Take Assessment'}
            </div>
            <div className={`p-2 rounded-lg border font-semibold ${
              userProfile.planPaid
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400'
            }`}>
              {userProfile.planPaid ? '✓ 4. Plan Paid' : `4. Discount (${userProfile.discountPercent}%)`}
            </div>
            <div className={`p-2 rounded-lg border font-semibold ${
              isAllApproved
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : userProfile.planPaid ? 'bg-orange-500/15 border-orange-500/40 text-orange-300' : 'bg-neutral-900 border-neutral-800 text-neutral-400'
            }`}>
              {isAllApproved ? '✓ 5. Tasks Approved' : '5. Code & Reviews'}
            </div>
            <div className={`p-2 rounded-lg border font-semibold ${
              certificate
                ? 'bg-green-500/20 border-green-500 text-green-300 shadow-md shadow-green-500/20'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400'
            }`}>
              {certificate ? '🎉 6. Certificate' : '6. Certification'}
            </div>
          </div>
        </div>
      </div>

      {/* Action Prompts for Steps 3 & 4 */}
      {!userProfile.assessmentTaken && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-600/20 to-amber-600/10 border border-orange-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">Step 3: Complete 15-Question Technical Assessment</h3>
            <p className="text-xs text-neutral-300">
              Answer 15 industry questions to benchmark your fundamentals and unlock up to 40% tuition scholarship!
            </p>
          </div>
          <button
            onClick={onOpenAssessment}
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs transition shadow-lg shadow-orange-500/30 shrink-0"
          >
            Start 15-Question Quiz →
          </button>
        </div>
      )}

      {userProfile.assessmentTaken && !userProfile.planPaid && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-600/20 to-amber-600/10 border border-orange-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">
              Step 4: Your {userProfile.discountPercent}% Scholarship Discount is Ready!
            </h3>
            <p className="text-xs text-neutral-300">
              Select your plan and complete payment to instantly deliver Task 1 and access the private GitHub repo.
            </p>
          </div>
          <button
            onClick={onOpenPayment}
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs transition shadow-lg shadow-orange-500/30 shrink-0"
          >
            Select Plan & Checkout (Save {userProfile.discountPercent}%) →
          </button>
        </div>
      )}

      {/* Certificate Unlocked Callout */}
      {isAllApproved && certificate && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-green-950/50 via-[#101912] to-[#0c0c0c] border border-green-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-green-500/10 animate-fade-in-up">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[11px] font-extrabold uppercase">
              <span>🏆 All Mandatory Tasks Approved</span>
            </div>
            <h3 className="text-xl font-black text-white">Congratulations! Your Verified Certificate is Ready</h3>
            <p className="text-xs text-neutral-300">
              Download your signed PDF credential and dispatch an official copy to your Gmail ({userProfile.email}).
            </p>
          </div>
          <button
            onClick={() => onViewCertificate(certificate)}
            className="px-6 py-3.5 rounded-xl bg-green-500 hover:bg-green-400 text-black font-black text-xs transition shadow-lg shadow-green-500/30 shrink-0 flex items-center gap-2"
          >
            <span>View & Download Certificate PDF</span>
            <span>📜</span>
          </button>
        </div>
      )}

      {/* Task Lifecycle Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-white">Internship Task Deliverables</h3>
            <p className="text-xs text-neutral-400">
              Mandatory Rule: Each task requires GitHub PR Link + Detailed Description + Verification Screenshot.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
            Assigned Trainer: Dr. Sarah Jenkins (AWS)
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {tasks.map((task) => {
            const isLocked = !userProfile.planPaid || task.status === 'locked';

            return (
              <div
                key={task.id}
                className={`p-6 rounded-2xl border transition-all ${
                  task.status === 'approved'
                    ? 'bg-[#101310] border-green-500/40'
                    : task.status === 'submitted'
                    ? 'bg-[#14120e] border-orange-500/40'
                    : isLocked
                    ? 'bg-[#0e0e0e] border-neutral-800/80 opacity-60'
                    : 'bg-[#121212] border-neutral-800 hover:border-orange-500/30'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black px-2 py-0.5 rounded bg-neutral-800 text-orange-400 font-mono">
                        Task #{task.number}
                      </span>
                      <h4 className="text-base font-bold text-white">{task.title}</h4>
                      {task.mandatory && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-semibold border border-red-500/20">
                          Mandatory
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed max-w-3xl">
                      {task.description}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="self-start sm:self-center shrink-0">
                    {task.status === 'approved' && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/15 text-green-400 border border-green-500/30 flex items-center gap-1.5">
                        <span>✓</span> Approved by Trainer
                      </span>
                    )}
                    {task.status === 'submitted' && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        In Review by Trainer
                      </span>
                    )}
                    {task.status === 'changes_requested' && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">
                        ⚠️ Changes Requested
                      </span>
                    )}
                    {task.status === 'unlocked' && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-neutral-800 text-neutral-300 border border-neutral-700">
                        Ready for Submission
                      </span>
                    )}
                    {isLocked && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-neutral-900 text-neutral-500 border border-neutral-800 flex items-center gap-1">
                        <span>🔒</span> Locked (Requires Previous Task Approval)
                      </span>
                    )}
                  </div>
                </div>

                {/* Requirements Checklist */}
                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap gap-2 text-[11px] text-neutral-400">
                  {task.requirements.map((req, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300">
                      • {req}
                    </span>
                  ))}
                </div>

                {/* Previous submission review info if submitted */}
                {task.submission && (
                  <div className="mt-4 p-4 rounded-xl bg-black/60 border border-neutral-800/80 text-xs space-y-2">
                    <div className="flex items-center justify-between text-neutral-400">
                      <span>Submitted GitHub: <a href={task.submission.githubUrl} target="_blank" rel="noreferrer" className="text-orange-400 underline font-mono">{task.submission.githubUrl}</a></span>
                      <span className="text-[10px]">{task.submission.submittedAt}</span>
                    </div>
                    <p className="text-neutral-300 text-[11px]">
                      <strong>Student Notes:</strong> "{task.submission.description}"
                    </p>
                    {task.submission.trainerFeedback && (
                      <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-200">
                        <strong>Trainer Feedback ({task.submission.reviewedBy}):</strong> "{task.submission.trainerFeedback}"
                      </div>
                    )}
                  </div>
                )}

                {/* Submit button */}
                {!isLocked && task.status !== 'approved' && (
                  <div className="mt-4 pt-2 flex justify-end">
                    <button
                      onClick={() => onOpenTaskSubmit(task)}
                      className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs transition shadow-md shadow-orange-500/20 flex items-center gap-2"
                    >
                      <span>{task.status === 'submitted' ? 'Resubmit Updated Evidence' : 'Submit Code & Screenshot'}</span>
                      <span>📤</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
