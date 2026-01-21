export type AssignmentStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "REVIEWED"
  | "NEEDS_REVISION";

export interface Assignment {
  id: string;
  title: string;
  studentName: string;
  status: AssignmentStatus;
  score?: number;
  feedback?: string;
  submittedAt: string;
}

export interface createAssignmentParams {
  title: string;
  description: string;
  dueDate: string;
  mentor: string;
}

export interface studentSubmitAssignmentParams {
  assignmentId: string;
  content: string;
}