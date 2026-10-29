import React, { useState } from 'react';
import { TaskItem } from '../types';

interface TrainerConsoleProps {
  tasks: TaskItem[];
  onApproveTask: (taskId: string, feedback: string) => void;
  onRequestRevisions: (taskId: string, feedback: string) => void;
}

export const TrainerConsole: React.FC<TrainerConsoleProps> = ({
  tasks,
  onApproveTask,
  onRequestRevisions,
}) => {
  const [feedbackTexts, setFeedbackTexts] = useState<Record<string, string>>({
    'task-1': 'Atomic Redis commands prevent concurrency race conditions under 10k req/s load. Screenshot verified and approved!',
  });

  const submittedTasks = tasks.filter((t) => t.status === 'submitted');
  const allReviewedTasks = tasks.filter((t) => t.status === 'approved' || t.status === 'changes_requested');

  const handleFeedbackChange = (taskId: string, text: string) => {
    setFeedbackTexts({
      ...feedbackTexts,
      [taskId]: text,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="p-6 rounded-2xl border border-orange-500/30 bg-gradient-to-r from-[#18130e] via-[#121212] to-[#0d0d0d] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-400 font-bold border border-orange-500/30">
              Trainer Studio & Verification
            </span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-300">Senior Staff Engineer SLA Portal</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            Review Submitted Code, PRs & Evidence
          </h2>
          <p className="text-xs text-neutral-400">
            Enforcing blueprint standards: GitHub commit integrity, test coverage, and visual UI/API proof verification.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-neutral-900/90 p-2 rounded-xl border border-neutral-800 text-xs font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-white font-bold">{submittedTasks.length}</span>
          <span className="text-neutral-400">Pending Review</span>
        </div>
      </div>

      {/* Pending Reviews Queue */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-white">Active Review Queue ({submittedTasks.length})</h3>

        {submittedTasks.length === 0 ? (
          <div className="p-8 rounded-2xl border border-neutral-800 bg-[#101010] text-center space-y-2">
            <div className="text-3xl">☕</div>
            <h4 className="text-base font-bold text-white">No Pending Submissions</h4>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              All student PRs and squad screenshots have been reviewed. New submissions will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {submittedTasks.map((task) => {
              const currentFeedback = feedbackTexts[task.id] || 'Implementation verified. Well structured PR and clear test screenshot.';

              return (
                <div
                  key={task.id}
                  className="p-6 rounded-2xl border border-orange-500/40 bg-[#121212] space-y-5 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 text-xs font-bold font-mono">
                          Task #{task.number}
                        </span>
                        <h4 className="text-base font-bold text-white">{task.title}</h4>
                      </div>
                      <div className="text-xs text-neutral-400 mt-1">
                        Track: <span className="text-neutral-200">{task.designation}</span> • Submitted by:{' '}
                        <strong className="text-white">{task.submission?.submittedBy}</strong> ({task.submission?.submittedAt})
                      </div>
                    </div>

                    <a
                      href={task.submission?.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-orange-400 font-mono text-xs border border-neutral-700 flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <span>Inspect PR on GitHub</span>
                      <span>↗</span>
                    </a>
                  </div>

                  {/* Submission Evidence details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left: Notes & Code snippet */}
                    <div className="space-y-3">
                      <div>
                        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Student Description:</span>
                        <p className="mt-1 p-3 rounded-xl bg-black/60 border border-neutral-800 text-xs text-neutral-200 leading-relaxed">
                          "{task.submission?.description}"
                        </p>
                      </div>

                      <div className="rounded-xl border border-neutral-800 bg-black p-3.5 font-mono text-xs space-y-1">
                        <div className="text-neutral-500">// Git Diff Check</div>
                        <div className="text-red-400/80 bg-red-500/10 px-2 py-0.5 rounded">- const count = await memoryMap.get(req.ip); // In-memory bottleneck</div>
                        <div className="text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">{'+ const count = await redisClient.incr(`rl:${req.ip}`);'}</div>
                        <div className="text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">{'+ await redisClient.expire(`rl:${req.ip}`, 60);'}</div>
                      </div>
                    </div>

                    {/* Right: Screenshot Evidence Preview */}
                    <div>
                      <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Submitted Screenshot Evidence:</span>
                      <div className="mt-1 rounded-xl border border-neutral-800 overflow-hidden bg-black max-h-56 flex items-center justify-center">
                        <img
                          src={task.submission?.screenshotUrl}
                          alt="Student Proof"
                          className="object-cover w-full h-full max-h-56 hover:scale-105 transition-transform"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Trainer Feedback & Approval CTA */}
                  <div className="pt-2 border-t border-neutral-800/80 space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Trainer Critique & Feedback:
                      </label>
                      <textarea
                        rows={2}
                        value={currentFeedback}
                        onChange={(e) => handleFeedbackChange(task.id, e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => onRequestRevisions(task.id, currentFeedback)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-neutral-300 hover:text-white border border-neutral-700 hover:border-yellow-500/50 transition"
                      >
                        Request Changes
                      </button>
                      <button
                        onClick={() => onApproveTask(task.id, currentFeedback)}
                        className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs transition shadow-lg shadow-orange-500/30 flex items-center gap-1.5"
                      >
                        <span>✓ Approve Task #{task.number} & Unlock Next</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* History of Reviewed Tasks */}
      {allReviewedTasks.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-base font-extrabold text-white">Recently Evaluated Tasks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {allReviewedTasks.map((t) => (
              <div key={t.id} className="p-4 rounded-xl border border-neutral-800 bg-[#101010] text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white font-mono">Task #{t.number}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    t.status === 'approved' ? 'bg-green-500/15 text-green-400' : 'bg-yellow-500/15 text-yellow-400'
                  }`}>
                    {t.status === 'approved' ? 'Approved' : 'Changes Requested'}
                  </span>
                </div>
                <div className="text-neutral-300 font-medium truncate">{t.title}</div>
                <div className="text-[10px] text-neutral-500 italic truncate">
                  Feedback: "{t.submission?.trainerFeedback}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
