export type RoleType = 'student' | 'trainer' | 'admin';
export type ModalityType = 'individual' | 'group';
export type DurationType = 1 | 2 | 6;
export type ViewMode = 'explore' | 'workspace';

export interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  modality: ModalityType;
  designation: string; // e.g., 'Full-Stack Developer', 'DevOps Architect', 'Backend Engineer'
  duration: DurationType;
  assessmentTaken: boolean;
  assessmentScore: number; // out of 15
  discountPercent: number; // e.g. 10%, 25%, 40% based on score
  planSelected: boolean;
  planPaid: boolean;
  teamId?: string;
  teamName?: string;
}

export interface TeamGroup {
  id: string;
  name: string;
  leaderEmail: string;
  repoUrl: string;
  planPaid: boolean;
  duration: DurationType;
  designation: string;
  members: {
    name: string;
    email: string;
    isLeader: boolean;
    hasCompletedTasks: boolean;
    certificateIssued: boolean;
  }[];
}

export interface TaskItem {
  id: string;
  number: number;
  title: string;
  designation: string;
  duration: DurationType;
  modality: ModalityType;
  description: string;
  requirements: string[];
  mandatory: boolean;
  status: 'locked' | 'unlocked' | 'submitted' | 'approved' | 'changes_requested';
  submission?: {
    githubUrl: string;
    description: string;
    screenshotUrl: string; // URL or base64
    submittedBy: string;
    submittedAt: string;
    trainerFeedback?: string;
    reviewedBy?: string;
    reviewedAt?: string;
  };
}

export interface CertificateRecord {
  id: string;
  studentName: string;
  studentEmail: string;
  designation: string;
  duration: DurationType;
  modality: ModalityType;
  teamName?: string;
  issueDate: string;
  verificationCode: string;
  status: 'issued' | 'emailed';
}

export interface EnrollmentFormData {
  fullName: string;
  email: string;
  collegeOrCompany: string;
  trackModality: ModalityType;
  durationMonths: DurationType;
  specialization: string;
  teamName?: string;
  teamSize?: number;
}
