export interface Classwork {
  id: number;
  details: string;
  total_marks: number;
  deadlineDate: Date;
  task_type: string;
  classroomId: number;
  updatedAt: Date;
  createdAt: Date;
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
