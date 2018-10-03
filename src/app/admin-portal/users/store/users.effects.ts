
import {mergeMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { REQUEST_LOAD_USERS, LoadUsers, UsersError, UserAction,
  REQUEST_DELETE_USER, UserDeleteSuccess, REQUEST_CREATE_USER,
  UserCreateSuccess, REQUEST_LOAD_USER, UserLoadSuccess, ResetEditingUser, REQUEST_EDIT_USER, UserEditSuccess } from './users.actions';
import { UsersService } from '../users.service';
import { RowsResponse, DataResponse } from '../../core/response.model';
import { UserModel } from '../../core/user.model';
import { UsersFeatureState } from './users.reducer';
import { UserCreateModel } from '../users.model';
import { Observable } from 'rxjs';


/**
 * The users effect class to do some asynchronous actions. Loading of users, deleting users, creating users and updating.
 *
 * @export
 * @class UsersEffect
 */
@Injectable()
export class UsersEffect {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private store: Store<UsersFeatureState>,
    private router: Router
  ) { }
  @Effect()
  $requestLoadUsersEffect = this.actions$
    .ofType(REQUEST_LOAD_USERS).pipe(
    map((action: UserAction) => action.payload),
    mergeMap(() => {
        return this.usersService.getUsers().pipe(
          map((response: RowsResponse<UserModel>) => {
            if (response.rows) {
              return new LoadUsers(response.rows);
            }
          }))
          .catch((err: any, caught: Observable<UsersError | LoadUsers>) => {
            this.store.dispatch(new UsersError(err, REQUEST_LOAD_USERS));
            return of();
          });
    }));

  @Effect()
  $requestDeleteUserEffect = this.actions$
    .ofType(REQUEST_DELETE_USER).pipe(
    map((action: UserAction) => action.payload),
    mergeMap((id: string) => {
      return this.usersService.removeUser(id).pipe(
        map((response: DataResponse<UserModel>) => {
          if (response.data) {
            return new UserDeleteSuccess(response.data);
          }
        }))
        .catch((err: any, caught: Observable<UsersError | UserDeleteSuccess>) => {
          this.store.dispatch(new UsersError(err, REQUEST_DELETE_USER));
          return of();
        });
    }));

  @Effect()
  $requestCreateUserEffect = this.actions$
    .ofType(REQUEST_CREATE_USER).pipe(
    map((action: UserAction) => action.payload),
    mergeMap((user: UserCreateModel) => {
      return this.usersService.addUser(user).pipe(
        map((response: DataResponse<UserModel>) => {
          if (response.data) {
            this.router.navigate(['/admin/users']);
            return new UserCreateSuccess(response.data);
          }
        }))
        .catch((err: any, caught: Observable<UsersError | UserCreateSuccess>) => {
          this.store.dispatch(new UsersError(err, REQUEST_CREATE_USER));
          return of();
        });
    }));
  @Effect()
  $requestLoadUserEffect = this.actions$
    .ofType(REQUEST_LOAD_USER).pipe(
    map((action: UserAction) => action.payload),
    mergeMap((id: string) => {
      this.store.dispatch(new ResetEditingUser());
      return this.usersService.loadUser(id).pipe(
        map((response: DataResponse<UserModel>) => {
          if (response.data) {
            return new UserLoadSuccess(response.data);
          }
        }))
        .catch((err: any, caught: Observable<UsersError | UserLoadSuccess>) => {
          this.store.dispatch(new UsersError(err, REQUEST_LOAD_USER));
          return of();
        });
    }));

  @Effect()
  $requestEditUserEffect = this.actions$
    .ofType(REQUEST_EDIT_USER).pipe(
    map((action: UserAction) => action.payload),
    mergeMap((user: UserModel) => {
      return this.usersService.editUser(user).pipe(
        map((response: DataResponse<UserModel>) => {
          if (response.data) {
            this.router.navigate(['/admin/users']);
            return new UserEditSuccess(response.data);
          }
        }))
        .catch((err: any, caught: Observable<UsersError | UserLoadSuccess>) => {
          this.store.dispatch(new UsersError(err, REQUEST_EDIT_USER));
          return of();
        });
    }));
}
