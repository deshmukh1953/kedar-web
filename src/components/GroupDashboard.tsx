import React, { useState } from 'react';
import { UserProfile, TeamGroup, TaskItem, CertificateRecord } from '../types';

interface GroupDashboardProps {
  userProfile: UserProfile;
  team: TeamGroup;
  tasks: TaskItem[];
  onOpenTaskSubmit: (task: TaskItem) => void;
  onInviteMember: (name: string, email: string) => void;
  onOpenPayment: () => void;
  onViewMemberCertificate: (memberEmail: string) => void;
}

export const GroupDashboard: React.FC<GroupDashboardProps> = ({
  userProfile,
  team,
  tasks,
  onOpenTaskSubmit,
  onInviteMember,
  onOpenPayment,
  onViewMemberCertificate,
}) => {
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const approvedCount = tasks.filter((t) => t.status === 'approved').length;
  const isAllApproved = approvedCount === tasks.length;
  const canInviteMore = team.members.length < 5;

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteName && inviteEmail && canInviteMore) {
      onInviteMember(inviteName, inviteEmail);
      setInviteName('');
      setInviteEmail('');
      setIsInviteOpen(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Squad Header */}
      <div className="p-6 rounded-2xl border border-orange-500/30 bg-gradient-to-r from-[#18130e] via-[#121212] to-[#0d0d0d] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-400 font-bold border border-orange-500/30">
                Squad Track (Max 5 Members)
              </span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-300 font-semibold">{team.duration} Month Sprints</span>
              <span className="text-neutral-500">•</span>
              <span className="text-white font-bold">{team.designation}</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1 tracking-tight">
              {team.name}
            </h2>
            <p className="text-xs text-neutral-400">
              Shared GitHub Repo: <a href={team.repoUrl} target="_blank" rel="noreferrer" className="text-orange-400 underline font-mono">{team.repoUrl}</a>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {canInviteMore && (
              <button
                onClick={() => setIsInviteOpen(true)}
                className="px-4 py-2 rounded-xl border border-orange-500/40 bg-neutral-900 text-orange-300 hover:text-white hover:border-orange-500 text-xs font-bold transition flex items-center gap-1.5"
              >
                <span>+ Invite Member ({team.members.length}/5)</span>
              </button>
            )}

            {!team.planPaid && (
              <button
                onClick={onOpenPayment}
                className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs transition shadow-md shadow-orange-500/20"
              >
                Pay Squad Plan →
              </button>
            )}
          </div>
        </div>

        {/* Squad Members Cards */}
        <div className="pt-2 border-t border-neutral-800">
          <div className="text-xs font-semibold text-neutral-400 mb-2">Team Roster (Max 5 Members):</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {team.members.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/80 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white truncate">{m.name}</span>
                  {m.isLeader && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 font-bold">
                      Leader
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-neutral-400 truncate font-mono">{m.email}</div>
                
                <div className="pt-1.5 border-t border-neutral-800 flex items-center justify-between text-[10px]">
                  <span className={isAllApproved ? 'text-green-400 font-bold' : 'text-neutral-500'}>
                    {isAllApproved ? '✓ Eligible' : 'In Progress'}
                  </span>
                  {isAllApproved && (
                    <button
                      onClick={() => onViewMemberCertificate(m.email)}
                      className="text-orange-400 hover:text-orange-300 underline font-semibold"
                    >
                      Cert PDF
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invite Member Dialog */}
      {isInviteOpen && (
        <div className="p-5 rounded-2xl border border-orange-500/40 bg-[#121212] space-y-3 animate-fade-in">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white">Invite Teammate to {team.name}</h4>
            <button onClick={() => setIsInviteOpen(false)} className="text-neutral-400 hover:text-white">&times;</button>
          </div>
          <form onSubmit={handleInvite} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <input
              type="text"
              required
              placeholder="Teammate Full Name"
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
            />
            <input
              type="email"
              required
              placeholder="Teammate Gmail / Email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-bold transition"
            >
              Add Teammate to Squad
            </button>
          </form>
        </div>
      )}

      {/* Team Tasks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-white">Shared Squad Deliverables</h3>
            <p className="text-xs text-neutral-400">
              Any squad member can submit GitHub PR link + Description + Verification Screenshot on behalf of the squad.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
            {approvedCount}/{tasks.length} Team Milestones Approved
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {tasks.map((task) => {
            const isLocked = !team.planPaid || task.status === 'locked';

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
                        Team Task #{task.number}
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
                    {task.status === 'unlocked' && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-neutral-800 text-neutral-300 border border-neutral-700">
                        Open for Squad Submission
                      </span>
                    )}
                    {isLocked && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-neutral-900 text-neutral-500 border border-neutral-800">
                        🔒 Locked
                      </span>
                    )}
                  </div>
                </div>

                {/* Submission details */}
                {task.submission && (
                  <div className="mt-4 p-4 rounded-xl bg-black/60 border border-neutral-800/80 text-xs space-y-2">
                    <div className="flex items-center justify-between text-neutral-400">
                      <span>Submitted by <strong>{task.submission.submittedBy}</strong>: <a href={task.submission.githubUrl} target="_blank" rel="noreferrer" className="text-orange-400 underline font-mono">{task.submission.githubUrl}</a></span>
                      <span className="text-[10px]">{task.submission.submittedAt}</span>
                    </div>
                    <p className="text-neutral-300 text-[11px]">
                      <strong>Description:</strong> "{task.submission.description}"
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
                      <span>Submit Squad Code & Screenshots</span>
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
