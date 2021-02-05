import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Comment,
  CommentResponseBody,
  CommentSubmitBody,
} from '../../classroom/models/comment.model';
import {
  PostResponseBody,
  PostSubmitBody,
} from '../../classroom/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class ClassroomGeneralService {
  constructor(private http: HttpClient) {}
  baseURL: string = environment.serverURL;

  addPost(classroomId: number, post: PostSubmitBody) {
    let url: string = `${this.baseURL}/classrooms/${classroomId}/posts`;
    return this.http.post<PostResponseBody>(url, post);
  }

  addPostComment(
    classroomId: number,
    postId: number,
    comment: CommentSubmitBody,
  ) {
    let url: string = `${this.baseURL}/classrooms/${classroomId}/posts/${postId}/comments`;
    return this.http.post<CommentResponseBody>(url, comment);
  }
}
