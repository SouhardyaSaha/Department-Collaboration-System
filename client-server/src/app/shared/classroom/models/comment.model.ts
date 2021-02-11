import { User } from './classroom.model';

export interface Comment {
  id: number;
  content: string;
  user: User;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentResponseBody {
  status: string;
  data: {
    comment: Comment;
  };
}

export interface CommentSubmitBody {
  content: string;
}
