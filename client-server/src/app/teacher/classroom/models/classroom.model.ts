import { Classwork } from './classwork.model';
import { Course } from './course.model';
import { Post } from './post.model';

export interface User {
  id: number;
  name: string;
  email?: string;
}

export interface Student {
  id: number;
  registration: number;
  user: User;
}

export interface Teacher {
  id: number;
  designation: string;
  user: User;
}

export interface Classroom {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  courseId?: number;
  teacherId?: number;
  course: Course;
  teacher: Teacher;
  students?: Student[];
  posts?: Post[];
  classworks?: Classwork[];
}

export interface SingleClassroomResponseBody {
  status: string;
  data: {
    classroom: Classroom;
  };
}

export interface MultipleClassroomResponseBody {
  status: string;
  data: {
    classrooms: Classroom[];
  };
}

export interface ClassroomPostBody {
  courseId: number;
  sessionId: number;
}

export interface ClassroomCreateResponseBody {
  status: string;
  data: {
    classroom: {
      id: number;
    };
  };
}
