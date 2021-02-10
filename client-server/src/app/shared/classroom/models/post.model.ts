import { User } from './classroom.model';
import { Comment } from './comment.model';

export interface FileBody {
  id: number;
  uri: string;
  is_image: string;
  createdAt: string;
  updatedAt: string;
  postId?: number;
  submissionId?: number;
}

export interface Post {
  id: number;
  content: string;
  user: User;
  classroomId: number;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  files: FileBody[];
}

export interface PostSubmitBody {
  content: string;
  files: File[];
}

export interface PostResponseBody {
  status: string;
  data: {
    post: Post;
  };
}

// export interface MultiplePostResponseBody {

// }
