export interface Course {
  id: number;
  title: string;
  credit: number;
  is_optional: boolean;
  semester: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CoursePostBody {
  title: string;
  credit: number;
  is_optional: boolean;
  semester: number;
}

export interface CourseResponseBody {
  status: string;
  data: {
    courses: Course[];
  };
}
