import React, { useState } from 'react';
import { RoleType, DurationType, ViewMode, UserProfile, TeamGroup, TaskItem, CertificateRecord } from './types';
import { INITIAL_TASKS } from './data/assessmentAndTasks';
import { Navbar } from './components/Navbar';
import { DurationBar } from './components/DurationBar';
import { StudentEnrollmentShowcase } from './components/StudentEnrollmentShowcase';
import { IndividualDashboard } from './components/IndividualDashboard';
import { GroupDashboard } from './components/GroupDashboard';
import { TrainerConsole } from './components/TrainerConsole';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginModal } from './components/LoginModal';
import { AssessmentModal } from './components/AssessmentModal';
import { PlanPaymentModal } from './components/PlanPaymentModal';
import { TaskSubmitModal } from './components/TaskSubmitModal';
import { CertificateModal } from './components/CertificateModal';
import { Toast, ToastMessage } from './components/Toast';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('explore');
  const [currentRole, setCurrentRole] = useState<RoleType>('student');
  const [currentDuration, setCurrentDuration] = useState<DurationType>(2);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Current Active User
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: 'usr-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    role: 'student',
    modality: 'individual',
    designation: 'Full-Stack Developer',
    duration: 2,
    assessmentTaken: false,
    assessmentScore: 0,
    discountPercent: 10,
    planSelected: false,
    planPaid: false,
  });

  // Squad Group State (for group modality)
  const [teamGroup, setTeamGroup] = useState<TeamGroup>({
    id: 'grp-9402',
    name: 'DevSquad Alpha',
    leaderEmail: 'aarav.sharma@gmail.com',
    repoUrl: 'https://github.com/nexus-squad/alpha-platform',
    planPaid: false,
    duration: 2,
    designation: 'Full-Stack Developer',
    members: [
      { name: 'Aarav Sharma', email: 'aarav.sharma@gmail.com', isLeader: true, hasCompletedTasks: false, certificateIssued: false },
      { name: 'Rohan Verma', email: 'rohan.v@gmail.com', isLeader: false, hasCompletedTasks: false, certificateIssued: false },
      { name: 'Priya Patel', email: 'priya.patel@gmail.com', isLeader: false, hasCompletedTasks: false, certificateIssued: false },
      { name: 'Aditya Sen', email: 'aditya.sen@gmail.com', isLeader: false, hasCompletedTasks: false, certificateIssued: false },
    ],
  });

  // Tasks State
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);

  // Certificates Registry
  const [certificates, setCertificates] = useState<CertificateRecord[]>([
    {
      id: 'cert-101',
      studentName: 'Sneha Rao',
      studentEmail: 'sneha.rao@gmail.com',
      designation: 'Full-Stack Developer',
      duration: 2,
      modality: 'individual',
      issueDate: 'October 24, 2026',
      verificationCode: 'NEXUS-CERT-9041A',
      status: 'emailed',
    },
  ]);

  // Modals state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [activeTaskToSubmit, setActiveTaskToSubmit] = useState<TaskItem | null>(null);
  const [activeCertificateToView, setActiveCertificateToView] = useState<CertificateRecord | null>(null);

  const showToast = (title: string, message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    setToast({ title, message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Auth / Role Selection
  const handleSelectRole = (role: RoleType) => {
    setCurrentRole(role);
    setCurrentView('workspace');
    showToast(`Role Portal Switched`, `Viewing ${role.toUpperCase()} Workspace.`);
  };

  const handleSuccessLogin = (data: {
    role: RoleType;
    email: string;
    name: string;
    modality: 'individual' | 'group';
    designation: string;
    duration: DurationType;
  }) => {
    setCurrentRole(data.role);
    setCurrentDuration(data.duration);
    setCurrentUser({
      ...currentUser,
      role: data.role,
      name: data.name,
      email: data.email,
      modality: data.modality,
      designation: data.designation,
      duration: data.duration,
    });
    setCurrentView('workspace');

    if (data.role === 'student' && !currentUser.assessmentTaken) {
      showToast('Registration Successful', 'Welcome! Please take the 15-question technical assessment to unlock your scholarship discount.');
    } else {
      showToast('Signed In', `Authenticated as ${data.name} (${data.role}).`);
    }
  };

  // Assessment Completion
  const handleCompleteAssessment = (score: number, discountPercent: number) => {
    setCurrentUser((prev) => ({
      ...prev,
      assessmentTaken: true,
      assessmentScore: score,
      discountPercent: discountPercent,
    }));
    showToast('Assessment Completed', `Score: ${score}/15. You unlocked a ${discountPercent}% discount!`);
  };

  // Payment Completion
  const handlePaymentSuccess = () => {
    setCurrentUser((prev) => ({
      ...prev,
      planPaid: true,
      planSelected: true,
    }));
    setTeamGroup((prev) => ({
      ...prev,
      planPaid: true,
    }));
    // Unlock Task 1 automatically
    setTasks((prev) =>
      prev.map((t, idx) => (idx === 0 ? { ...t, status: 'unlocked' } : t))
    );
    showToast('Plan Unlocked & Paid', 'Task #1 is now delivered with private GitHub repository access!', 'success');
  };

  // Task Submission (Mandatory Screenshots + Description + GitHub Link)
  const handleSubmitTaskEvidence = (githubUrl: string, description: string, screenshotUrl: string) => {
    if (!activeTaskToSubmit) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === activeTaskToSubmit.id
          ? {
              ...t,
              status: 'submitted',
              submission: {
                githubUrl,
                description,
                screenshotUrl,
                submittedBy: currentUser.name,
                submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            }
          : t
      )
    );
    showToast('Evidence Dispatched', `Task #${activeTaskToSubmit.number} submitted for Senior Trainer review.`);
  };

  // Trainer Approval Workflow
  const handleTrainerApproveTask = (taskId: string, feedback: string) => {
    let nextTaskIdToUnlock: string | null = null;

    setTasks((prev) => {
      const updated = prev.map((t, idx) => {
        if (t.id === taskId) {
          // Identify next task to unlock
          if (idx + 1 < prev.length) {
            nextTaskIdToUnlock = prev[idx + 1].id;
          }
          return {
            ...t,
            status: 'approved' as const,
            submission: t.submission
              ? {
                  ...t.submission,
                  trainerFeedback: feedback,
                  reviewedBy: 'Dr. Sarah Jenkins',
                  reviewedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }
              : undefined,
          };
        }
        return t;
      });

      // Unlock next task automatically
      if (nextTaskIdToUnlock) {
        return updated.map((t) => (t.id === nextTaskIdToUnlock ? { ...t, status: 'unlocked' as const } : t));
      }
      return updated;
    });

    showToast('Task Approved', 'Milestone signed off! Next task in syllabus is now unlocked.', 'success');

    // Check if all mandatory tasks are now approved
    setTimeout(() => {
      checkAndIssueCertificates();
    }, 600);
  };

  const handleTrainerRequestChanges = (taskId: string, feedback: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: 'changes_requested' as const,
              submission: t.submission
                ? {
                    ...t.submission,
                    trainerFeedback: feedback,
                    reviewedBy: 'Dr. Sarah Jenkins',
                  }
                : undefined,
            }
          : t
      )
    );
    showToast('Changes Requested', 'Feedback and revision checklist returned to student.', 'warning');
  };

  // Certificate Issuance Engine
  const checkAndIssueCertificates = () => {
    const certCode = `NEXUS-CERT-${Math.floor(10000 + Math.random() * 90000)}B`;
    const newCert: CertificateRecord = {
      id: `cert-${Date.now()}`,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      designation: currentUser.designation,
      duration: currentUser.duration,
      modality: currentUser.modality,
      teamName: currentUser.modality === 'group' ? teamGroup.name : undefined,
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      verificationCode: certCode,
      status: 'issued',
    };

    setCertificates((prev) => [newCert, ...prev]);
    showToast('🎉 Certificate Unlocked!', `All mandatory tasks approved. Credential ${certCode} issued.`, 'success');
  };

  // Group Invite Teammate
  const handleInviteTeamMember = (name: string, email: string) => {
    if (teamGroup.members.length >= 5) {
      showToast('Maximum Reached', 'Squad cannot exceed 5 members per blueprint.', 'warning');
      return;
    }
    setTeamGroup((prev) => ({
      ...prev,
      members: [
        ...prev.members,
        { name, email, isLeader: false, hasCompletedTasks: false, certificateIssued: false },
      ],
    }));
    showToast('Teammate Invited', `${name} (${email}) added to ${teamGroup.name}.`);
  };

  // Admin creates new task
  const handleAdminAddNewTask = (taskData: Partial<TaskItem>) => {
    const nextNum = tasks.length + 1;
    const newTask: TaskItem = {
      id: `task-${nextNum}`,
      number: nextNum,
      title: taskData.title || `Milestone ${nextNum}`,
      designation: currentUser.designation,
      duration: currentUser.duration,
      modality: currentUser.modality,
      description: taskData.description || 'Complete required engineering milestone.',
      requirements: taskData.requirements || ['GitHub PR link', 'Screenshot proof', 'Description'],
      mandatory: true,
      status: 'locked',
    };
    setTasks((prev) => [...prev, newTask]);
    showToast('Task Created', `Task #${nextNum} deployed to active cohort syllabus.`);
  };

  // Find user's certificate if issued
  const userCertificate = certificates.find((c) => c.studentEmail === currentUser.email) || null;

  return (
    <div className="min-h-screen bg-[#080808] text-neutral-100 font-sans selection:bg-orange-500 selection:text-black">
      
      {/* Top Navigation */}
      <Navbar
        currentUser={currentUser}
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
        currentDuration={currentDuration}
        onSelectDuration={(d) => setCurrentDuration(d)}
        currentView={currentView}
        onSelectView={(v) => setCurrentView(v)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenAssessmentModal={() => setIsAssessmentModalOpen(true)}
        onSignOut={() => {
          setIsLoginModalOpen(true);
        }}
      />

      {/* Workspace Duration bar */}
      {currentView === 'workspace' && (
        <DurationBar
          currentDuration={currentDuration}
          onSelectDuration={(d) => setCurrentDuration(d)}
        />
      )}

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Explore / Blueprint View */}
        {currentView === 'explore' && (
          <StudentEnrollmentShowcase
            onOpenRegisterModal={() => setIsLoginModalOpen(true)}
            onOpenAssessment={() => setIsAssessmentModalOpen(true)}
            onSelectRole={handleSelectRole}
            onSelectDuration={(d) => setCurrentDuration(d)}
          />
        )}

        {/* Workspace Views */}
        {currentView === 'workspace' && (
          <>
            {/* 1. Student Portal */}
            {currentRole === 'student' && (
              <>
                {currentUser.modality === 'individual' ? (
                  <IndividualDashboard
                    userProfile={currentUser}
                    tasks={tasks}
                    onOpenTaskSubmit={(task) => setActiveTaskToSubmit(task)}
                    onOpenAssessment={() => setIsAssessmentModalOpen(true)}
                    onOpenPayment={() => setIsPaymentModalOpen(true)}
                    onViewCertificate={(cert) => setActiveCertificateToView(cert)}
                    certificate={userCertificate}
                  />
                ) : (
                  <GroupDashboard
                    userProfile={currentUser}
                    team={teamGroup}
                    tasks={tasks}
                    onOpenTaskSubmit={(task) => setActiveTaskToSubmit(task)}
                    onInviteMember={handleInviteTeamMember}
                    onOpenPayment={() => setIsPaymentModalOpen(true)}
                    onViewMemberCertificate={(email) => {
                      const cert = certificates.find((c) => c.studentEmail === email) || userCertificate;
                      if (cert) setActiveCertificateToView(cert);
                      else showToast('In Progress', 'Squad tasks must all be approved first.', 'info');
                    }}
                  />
                )}
              </>
            )}

            {/* 2. Trainer Review Portal */}
            {currentRole === 'trainer' && (
              <TrainerConsole
                tasks={tasks}
                onApproveTask={handleTrainerApproveTask}
                onRequestRevisions={handleTrainerRequestChanges}
              />
            )}

            {/* 3. Admin Hub */}
            {currentRole === 'admin' && (
              <AdminDashboard
                tasks={tasks}
                certificates={certificates}
                onAddNewTask={handleAdminAddNewTask}
                onAuditCertificates={() => showToast('Audit Complete', 'All 1,428 intern credentials verified in blockchain registry.')}
                onExportAnalytics={() => showToast('Analytics Exported', 'CSV report downloaded to your device.')}
              />
            )}
          </>
        )}
      </main>

      {/* Modals for Complete End-to-End Flow */}
      
      {/* 1. Register / Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccessLogin={handleSuccessLogin}
      />

      {/* 2. 15-Question Technical Assessment Modal */}
      <AssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        userProfile={currentUser}
        onCompleteAssessment={handleCompleteAssessment}
      />

      {/* 3. Plan & Payment Modal */}
      <PlanPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        userProfile={currentUser}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* 4. Task Submission Modal (Mandatory: GitHub + Description + Screenshots) */}
      {activeTaskToSubmit && (
        <TaskSubmitModal
          isOpen={!!activeTaskToSubmit}
          onClose={() => setActiveTaskToSubmit(null)}
          task={activeTaskToSubmit}
          onSubmit={handleSubmitTaskEvidence}
        />
      )}

      {/* 5. Verified Certificate Modal (PDF download + Gmail dispatch) */}
      {activeCertificateToView && (
        <CertificateModal
          isOpen={!!activeCertificateToView}
          onClose={() => setActiveCertificateToView(null)}
          certificate={activeCertificateToView}
          onSendEmail={(email) => {
            showToast('Email Dispatched', `Verified PDF certificate dispatched to ${email}!`, 'success');
          }}
        />
      )}

      {/* Toast Notification Banner */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default App;
