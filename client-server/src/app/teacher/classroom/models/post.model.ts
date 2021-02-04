import { User } from './classroom.model';
import { Comment } from './comment.model';

export interface Post {
  id: number;
  content: string;
  user: User;
  classroomId: number;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
}

export interface PostSubmitBody {
  content: string;
}

export interface PostResponseBody {
  status: string;
  data: {
    post: Post;
  };
}

// export interface MultiplePostResponseBody {

// }
