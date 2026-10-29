import React, { useState } from 'react';
import { TaskItem, CertificateRecord } from '../types';

interface AdminDashboardProps {
  tasks: TaskItem[];
  certificates: CertificateRecord[];
  onAddNewTask: (task: Partial<TaskItem>) => void;
  onAuditCertificates: () => void;
  onExportAnalytics: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  tasks,
  certificates,
  onAddNewTask,
  onAuditCertificates,
  onExportAnalytics,
}) => {
  const [activeTab, setActiveTab] = useState<'plans' | 'tasks' | 'assessments' | 'certificates'>('plans');

  // Task creation state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle && newTaskDesc) {
      onAddNewTask({
        title: newTaskTitle,
        description: newTaskDesc,
        requirements: ['GitHub repository with clean Git commit history', 'Passing automated test suite with screenshot', 'Clean production documentation in README'],
        mandatory: true,
      });
      setNewTaskTitle('');
      setNewTaskDesc('');
      setIsTaskModalOpen(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="p-6 rounded-2xl border border-orange-500/30 bg-gradient-to-r from-[#18130e] via-[#121212] to-[#0d0d0d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Admin Control Hub</span>
          <h2 className="text-2xl font-black text-white mt-1">Platform Operations & Blueprint Configuration</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure internship plans, 15-question assessments, discount engine rules, mandatory task delivery, and audit certificates.
          </p>
        </div>
        <div className="flex space-x-2.5">
          <button
            onClick={onAuditCertificates}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-700 bg-neutral-800/80 text-neutral-200 hover:text-white hover:border-orange-500/50 transition"
          >
            Audit Certificates
          </button>
          <button
            onClick={onExportAnalytics}
            className="px-4 py-2 rounded-xl text-xs bg-orange-500 hover:bg-orange-400 text-black font-bold transition shadow-md shadow-orange-500/20"
          >
            Export Analytics
          </button>
        </div>
      </div>

      {/* KPI Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-neutral-800 bg-[#101010]">
          <div className="text-xs font-medium text-neutral-400">Total Interns Enrolled</div>
          <div className="text-2xl font-black text-white mt-1">1,428</div>
          <div className="text-[10px] text-green-400 mt-1 font-semibold">↑ 24% Solo & Squad Enrollment</div>
        </div>
        <div className="p-5 rounded-2xl border border-orange-500/30 bg-gradient-to-b from-[#18130e] to-[#101010]">
          <div className="text-xs font-medium text-neutral-400">Mandatory Tasks Delivered</div>
          <div className="text-2xl font-black text-orange-400 mt-1">{tasks.length} Active</div>
          <div className="text-[10px] text-orange-400/80 mt-1 font-semibold">Strict screenshot & PR checks</div>
        </div>
        <div className="p-5 rounded-2xl border border-neutral-800 bg-[#101010]">
          <div className="text-xs font-medium text-neutral-400">Assessments Completed</div>
          <div className="text-2xl font-black text-white mt-1">2,890</div>
          <div className="text-[10px] text-neutral-400 mt-1">Avg Score: 11.2 / 15 (25% Disc)</div>
        </div>
        <div className="p-5 rounded-2xl border border-neutral-800 bg-[#101010]">
          <div className="text-xs font-medium text-neutral-400">Certificates Issued & Emailed</div>
          <div className="text-2xl font-black text-green-400 mt-1">{certificates.length}</div>
          <div className="text-[10px] text-green-400/80 mt-1">100% Cryptographically signed</div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="border-b border-neutral-800 flex gap-4 text-xs font-bold">
        {[
          { id: 'plans' as const, label: '💰 Plans & Discount Engine' },
          { id: 'tasks' as const, label: '📋 Task Deliverables & Criteria' },
          { id: 'assessments' as const, label: '📝 15-Question Assessment Engine' },
          { id: 'certificates' as const, label: '📜 Certificates Registry' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 border-b-2 transition ${
              activeTab === tab.id
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Plans & Discount Rules */}
      {activeTab === 'plans' && (
        <div className="space-y-4">
          <div className="p-6 rounded-2xl border border-neutral-800 bg-[#121212] space-y-4">
            <h3 className="text-base font-bold text-white">Tuition Plans & Assessment Scholarship Thresholds</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                <span className="font-bold text-orange-400 text-sm">1-Month Sprint</span>
                <div className="text-lg font-black text-white">₹1,999</div>
                <p className="text-neutral-400 text-[11px]">4 Weeks Fast Track • Individual or Squad</p>
                <div className="pt-2 text-[10px] text-green-400 border-t border-neutral-800">
                  Max Discount with Quiz: ₹799 (40% OFF)
                </div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900 border border-orange-500/40 space-y-2">
                <span className="font-bold text-orange-400 text-sm">2-Month Core (Popular)</span>
                <div className="text-lg font-black text-white">₹3,499</div>
                <p className="text-neutral-400 text-[11px]">8 Weeks Architecture • Senior Mentorship</p>
                <div className="pt-2 text-[10px] text-green-400 border-t border-neutral-800">
                  Max Discount with Quiz: ₹1,400 (40% OFF)
                </div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                <span className="font-bold text-orange-400 text-sm">6-Month Capstone</span>
                <div className="text-lg font-black text-white">₹7,999</div>
                <p className="text-neutral-400 text-[11px]">24 Weeks Capstone • Career Defense & Referrals</p>
                <div className="pt-2 text-[10px] text-green-400 border-t border-neutral-800">
                  Max Discount with Quiz: ₹3,200 (40% OFF)
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-black/60 border border-neutral-800 text-xs space-y-1">
              <span className="text-orange-400 font-bold">Active Discount Engine Algorithm:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-neutral-300 font-mono text-[11px]">
                <div className="p-2 rounded bg-neutral-900">Score 13-15: <strong>40% OFF</strong></div>
                <div className="p-2 rounded bg-neutral-900">Score 9-12: <strong>25% OFF</strong></div>
                <div className="p-2 rounded bg-neutral-900">Score 5-8: <strong>15% OFF</strong></div>
                <div className="p-2 rounded bg-neutral-900">Score &lt;5: <strong>10% Base</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Task Deliverables & Requirements Configuration */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Mandatory Internship Tasks Lifecycle</h3>
            <button
              onClick={() => setIsTaskModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black text-xs font-bold transition shadow-md"
            >
              + Create New Task Deliverable
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 rounded-xl border border-neutral-800 bg-[#121212] text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-orange-400 font-bold">Task #{task.number}</span>
                    <h4 className="font-bold text-white">{task.title}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/15 text-red-400 font-semibold">
                      Mandatory
                    </span>
                  </div>
                  <span className="text-neutral-400 font-mono text-[11px]">{task.status.toUpperCase()}</span>
                </div>
                <p className="text-neutral-300 text-[11px]">{task.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] text-neutral-400">
                  <span className="text-orange-400 font-bold">Evidence Rule:</span>
                  <span className="p-1 rounded bg-neutral-900 border border-neutral-800">1. GitHub PR Link</span>
                  <span className="p-1 rounded bg-neutral-900 border border-neutral-800">2. Description</span>
                  <span className="p-1 rounded bg-neutral-900 border border-neutral-800">3. Screenshot Verification</span>
                </div>
              </div>
            ))}
          </div>

          {/* New Task Modal */}
          {isTaskModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#121212] border border-orange-500/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                  <h4 className="text-sm font-bold text-white">Create Mandatory Task Deliverable</h4>
                  <button onClick={() => setIsTaskModalOpen(false)} className="text-neutral-400 hover:text-white">&times;</button>
                </div>
                <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-neutral-400 mb-1">Task Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Distributed Event Bus & Kafka Streaming"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Detailed Description</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe the technical scope and deliverables required from interns..."
                      value={newTaskDesc}
                      onChange={(e) => setNewTaskDesc(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white"
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-bold transition"
                    >
                      Deploy Task to Cohort
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Assessment Questions */}
      {activeTab === 'assessments' && (
        <div className="p-6 rounded-2xl border border-neutral-800 bg-[#121212] space-y-4 text-xs">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-white">15-Question Assessment Engine</h3>
              <p className="text-neutral-400 text-xs">Technical questions mapped to Node.js, System Architecture, Redis, and React.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 font-bold font-mono">
              15 Questions Configured
            </span>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
            <span className="font-semibold text-white">Sample Evaluation Topics:</span>
            <ul className="list-disc list-inside text-neutral-300 space-y-1 text-[11px]">
              <li>Node.js libuv event loop and asynchronous thread pool management</li>
              <li>Distributed caching and atomic Redis INCR sliding-window rate limiters</li>
              <li>HTTP 429 status code handling & REST idempotency principles</li>
              <li>Database transaction isolation levels (SERIALIZABLE) & PostgreSQL B-Trees</li>
              <li>Docker multi-stage optimization & CI/CD pull request gate checks</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 4: Certificate Registry & Verification */}
      {activeTab === 'certificates' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Verified Certificate Issuance Registry</h3>
            <span className="text-xs text-neutral-400 font-mono">
              {certificates.length} Certificates Generated & Dispatched
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-2xl border border-green-500/30 bg-[#101511] space-y-3 text-xs"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white text-sm">{cert.studentName}</h4>
                    <span className="text-[11px] text-neutral-400 font-mono">{cert.studentEmail}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold">
                    ✓ Issued
                  </span>
                </div>

                <div className="space-y-1 text-[11px] text-neutral-300">
                  <div>Track: <strong>{cert.designation}</strong></div>
                  <div>Duration: <strong>{cert.duration} Months</strong> ({cert.modality})</div>
                  {cert.teamName && <div>Squad: <strong>{cert.teamName}</strong></div>}
                  <div className="text-neutral-500 font-mono text-[10px]">Verification: {cert.verificationCode}</div>
                </div>

                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-green-400 font-semibold">✓ Emailed to Gmail</span>
                  <span className="text-neutral-400">{cert.issueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
