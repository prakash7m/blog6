
import {of as observableOf,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';





import 'rxjs/util/pipe';
import { HttpClient } from '@angular/common/http';
import storage from 'local-storage-fallback';

import { UserModel } from './user.model';
import { DataResponse, HandledErrorResponse, StandardResponse } from './response.model';
import { apiURL } from '../config';
import { GlobalErrorHandler } from './global-error-handler';

/**
 * Service to do user authentication related calls.
 *
 * @export
 * @class AuthenticationService
 */
@Injectable()
export class AuthenticationService {
  private user: UserModel = null;
  private recentAuthStatus: boolean = null;
  /**
   * Creates an instance of AuthenticationService.
   * @param {HttpClient} http
   * @param {Router} router
   * @param {GlobalErrorHandler} globalErrorHandler
   * @memberof AuthenticationService
   */
  constructor(private http: HttpClient, private router: Router, private globalErrorHandler: GlobalErrorHandler) { }

  hasLoginCookie(): boolean {
    return storage.getItem('recent-auth-state') ? true : false;
  }
  
  /**
   * Makes api call to server to check the logged in state of the user.
   * If logged in, saves in a local variable for future reference.
   *
   * @returns {Promise<boolean>}
   * @memberof AuthenticationService
   */
  async isAuthenticated(): Promise<boolean | HandledErrorResponse> {
    if (storage.getItem('recent-auth-state')) {
      return observableOf(true).toPromise();
    }
    return this.http.get<DataResponse<UserModel>>(`${apiURL}/isauthenticated`, { withCredentials: true }).pipe(
      map((res: DataResponse<UserModel>) => {
        this.user = res.data;
        storage.setItem('recent-auth-state', '1');
        return true;
      }),
      catchError((err: any, caught: Observable<boolean>) => {
        this.setNotAuthenticated();
        return this.globalErrorHandler.handleError(err);
      }),)
      .toPromise();
  }

  /**
   * Authenticate a user with provided credentials
   *
   * @param {*} { username, password }
   * @returns {Promise<Object>}
   * @memberof AuthenticationService
   */
  async authenticate({ username, password }): Promise<DataResponse<UserModel> | HandledErrorResponse> {
    return this.http.post<DataResponse<UserModel>>(`${apiURL}/login`, { username, password }, { withCredentials: true }).pipe(
      map((res: DataResponse<UserModel>) => {
        this.user = res.data;
        storage.setItem('recent-auth-state', '1');
        return res;
      }),
      catchError((err: any, caught: Observable<DataResponse<UserModel>>) => {
        this.setNotAuthenticated();
        return this.globalErrorHandler.handleError(err);
      }),)
      .toPromise();
  }

  /**
   * Logs out a user. Also resets the local logged in status.
   *
   * @returns {Promise<any>}
   * @memberof AuthenticationService
   */
  async logout(): Promise<StandardResponse | HandledErrorResponse> {
    return this.http.get(`${apiURL}/logout`, { withCredentials: true }).pipe(
      map((res: StandardResponse) => {
        this.setNotAuthenticated();
        return res;
      }),
      catchError((err: any, caught: Observable<StandardResponse>) => {
        this.setNotAuthenticated();
        return this.globalErrorHandler.handleError(err);
      }),)
      .toPromise();
  }

  setNotAuthenticated() {
    this.user = null;
    storage.setItem('recent-auth-state', '');
  }
}
