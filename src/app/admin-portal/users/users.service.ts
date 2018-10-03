
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

import { RowsResponse, HandledErrorResponse, DataResponse } from '../core/response.model';
import { apiURL } from '../config';
import { UserModel } from '../core/user.model';
import { GlobalErrorHandler } from '../core/global-error-handler';
import { UserCreateModel } from './users.model';


/**
 * Users service for api operation
 *
 * @export
 */
@Injectable()
export class UsersService {
  constructor(private http: HttpClient, private globalErrorHandler: GlobalErrorHandler) { }
  /**
   * Get the list of users
   *
   * @returns {(Observable<RowsResponse<UserModel> | HandledErrorResponse>)}
   * @memberof UsersService
   */
  getUsers(): Observable<RowsResponse<UserModel> | HandledErrorResponse> {
    return this.http.get<RowsResponse<UserModel>>(`${apiURL}/user`, { withCredentials: true }).pipe(
      map((res: RowsResponse<UserModel>) => res))
      .catch((err: any, caught: Observable<RowsResponse<UserModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  /**
   * Add User
   *
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @returns {(Observable<DataResponse<UserModel> | HandledErrorResponse>)}
   * @memberof UsersService
   */
  addUser(user: UserCreateModel): Observable<DataResponse<UserModel> | HandledErrorResponse> {
    return this.http.post<DataResponse<UserModel>>(`${apiURL}/user`, user, { withCredentials: true }).pipe(
      map((res: DataResponse<UserModel>) => res))
      .catch((err: any, caught: Observable<DataResponse<UserModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  /**
   * Delete user by id
   *
   * @param {string} id
   * @returns {(Observable<DataResponse<UserModel> | HandledErrorResponse>)}
   * @memberof UsersService
   */
  removeUser(id: string): Observable<DataResponse<UserModel> | HandledErrorResponse> {
    return this.http.delete<DataResponse<UserModel>>(`${apiURL}/user/${id}`, { withCredentials: true }).pipe(
      map((res: DataResponse<UserModel>) => res))
      .catch((err: any, caught: Observable<DataResponse<UserModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  loadUser(id: string): Observable<DataResponse<UserModel> | HandledErrorResponse> {
    return this.http.get<DataResponse<UserModel>>(`${apiURL}/user/${id}`, { withCredentials: true }).pipe(
      map((res: DataResponse<UserModel>) => res))
      .catch((err: any, caught: Observable<DataResponse<UserModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  editUser(user: UserModel): Observable<DataResponse<UserModel> | HandledErrorResponse> {
    return this.http.put<DataResponse<UserModel>>(`${apiURL}/user/${user._id}`, user, { withCredentials: true }).pipe(
      map((res: DataResponse<UserModel>) => res))
      .catch((err: any, caught: Observable<DataResponse<UserModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }
}
