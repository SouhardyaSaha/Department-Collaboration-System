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
    const submitData: FormData = new FormData();
    submitData.append('content', post.content);
    post.files.forEach(file => {
      submitData.append('files', file);
    });
    return this.http.post<PostResponseBody>(url, submitData);
    // return this.http.post<PostResponseBody>(url, post);
  }

  // updatePost(classroomId: number, post: PostSubmitBody) {
  //   let url: string = `${this.baseURL}/classrooms/${classroomId}/posts`;
  //   const submitData: FormData = new FormData();
  //   submitData.append('content', post.content);
  //   post.files.forEach(file => {
  //     submitData.append('edited_files', post.files)
  //   });
  //   post.files.forEach(file => {
  //     submitData.append('files', file);
  //   });
  //   return this.http.post<PostResponseBody>(url, submitData);
  // }

  deletePost(classroomId: number, postId: number) {
    let url: string = `${this.baseURL}/classrooms/${classroomId}/posts/${postId}`;
    return this.http.delete(url);
  }

  addPostComment(
    classroomId: number,
    postId: number,
    comment: CommentSubmitBody,
  ) {
    let url: string = `${this.baseURL}/classrooms/${classroomId}/posts/${postId}/comments`;
    return this.http.post<CommentResponseBody>(url, comment);
  }

  deletePostComment(classroomId: number, postId: number, commentId: number) {
    let url: string = `${this.baseURL}/classrooms/${classroomId}/posts/${postId}/comments/${commentId}`;
    return this.http.delete(url);
  }
}
