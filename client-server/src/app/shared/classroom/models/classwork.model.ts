import { Student } from './classroom.model';
import { FileBody } from './post.model';

export interface Classwork {
  id: number;
  details: string;
  total_marks: number;
  deadlineDate: Date;
  task_type: string;
  classroomId: number;
  submissions: Submission[];
  updatedAt: Date;
  createdAt: Date;
}

export interface Submission {
  id: number;
  createdAt: string;
  updatedAt: string;
  classworkId: number;
  studentId: number;
  student: Student;
  files: FileBody[];
}

export interface ClassworkSubmissionBody {
  files: File[];
}

export interface ClassworkSubmissionResponseBody {
  status: string;
}

export interface ClassworkResponseBody {
  status: string;
  data: {
    classwork: Classwork;
  };
}

export interface ClassworkSubmitBody {
  details: string;
  total_marks: number;
  deadlineDate: Date;
  task_type: string;
}
