
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RowsResponse, HandledErrorResponse, DataResponse } from '../core/response.model';
import { apiURL } from '../config';
import { PostModel } from './post.model';
import { GlobalErrorHandler } from '../core/global-error-handler';
import 'rxjs/add/operator/catch';


/**
 * Posts service for api operation
 *
 * @export
 * @class PostsService
 */
@Injectable()
export class PostsService {
  constructor(private http: HttpClient, private globalErrorHandler: GlobalErrorHandler) { }
  /**
   * Get the list of posts
   *
   * @returns {(Observable<RowsResponse<PostModel> | HandledErrorResponse>)}
   * @memberof PostsService
   */
  getPosts(): Observable<RowsResponse<PostModel> | HandledErrorResponse> {
    return this.http.get<RowsResponse<PostModel>>(`${apiURL}/post`, { withCredentials: true }).pipe(
      map((res: RowsResponse<PostModel>) => res))
      .catch((err: any, caught: Observable<RowsResponse<PostModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  /**
   * Add Post
   *
   * @param {string} postname
   * @param {string} email
   * @param {string} password
   * @returns {(Observable<DataResponse<PostModel> | HandledErrorResponse>)}
   * @memberof PostsService
   */
  addPost(post: PostModel): Observable<DataResponse<PostModel> | HandledErrorResponse> {
    return this.http.post<DataResponse<PostModel>>(`${apiURL}/post`, post, { withCredentials: true }).pipe(
      map((res: DataResponse<PostModel>) => res))
      .catch((err: any, caught: Observable<DataResponse<PostModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  /**
   * Delete post by id
   *
   * @param {string} id
   * @returns {(Observable<DataResponse<PostModel> | HandledErrorResponse>)}
   * @memberof PostsService
   */
  removePost(id: string): Observable<DataResponse<PostModel> | HandledErrorResponse> {
    return this.http.delete<DataResponse<PostModel>>(`${apiURL}/post/${id}`, { withCredentials: true }).pipe(
      map((res: DataResponse<PostModel>) => res))
      .catch((err: any, caught: Observable<DataResponse<PostModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  loadPost(id: string): Observable<DataResponse<PostModel> | HandledErrorResponse> {
    return this.http.get<DataResponse<PostModel>>(`${apiURL}/post/${id}`, { withCredentials: true }).pipe(
      map((res: DataResponse<PostModel>) => res))
      .catch((err: any, caught: Observable<DataResponse<PostModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  editPost(post: PostModel): Observable<DataResponse<PostModel> | HandledErrorResponse> {
    return this.http.put<DataResponse<PostModel>>(`${apiURL}/post/${post._id}`, post, { withCredentials: true }).pipe(
      map((res: DataResponse<PostModel>) => res))
      .catch((err: any, caught: Observable<DataResponse<PostModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }
}
