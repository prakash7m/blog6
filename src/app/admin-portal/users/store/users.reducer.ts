import { Action } from '@ngrx/store';

import { UserModel } from '../../core/user.model';
import {
  LOAD_USERS, UserAction, USERS_BUSY, USERS_ERROR, REQUEST_LOAD_USERS,
  USER_DELETE_SUCCESS, REQUEST_DELETE_USER, REQUEST_CREATE_USER,
  USER_CREATE_SUCCESS, USER_LOAD_SUCCESS, REQUEST_LOAD_USER, RESET_EDITING_USER,
  USER_EDIT_SUCCESS, REQUEST_EDIT_USER
} from './users.actions';
import { HandledErrorResponse } from '../../core/response.model';
import { StateHelper, MetaState } from '../../core/state.helper';

export interface UsersReducerState {
  users(state: UsersFeatureState, action: UserAction): UsersFeatureState;
}

export interface UsersState {
  users: UsersFeatureState;
}

export interface UsersFeatureState {
  usersList: UserModel[];
  meta: MetaState<UserModel>;
}

export const initialUsersFeatureState: UsersFeatureState = {
  usersList: [],
  meta: {}
};

export const usersReducer = (pstate: UsersFeatureState = initialUsersFeatureState, action: UserAction): UsersFeatureState => {
  const state = StateHelper.interceptMeta(pstate, action);
  switch (action.type) {
    case LOAD_USERS:
      return {
        ...state,
        usersList: action.payload
      };
    case USERS_BUSY:
      return {
        ...state,
        usersBusy: action.payload
      };
    case USERS_ERROR:
      return {
        ...state
      };
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        usersList: [...state.usersList.filter(item => item._id !== action.payload._id)]
      };
    case USER_CREATE_SUCCESS:
      return {
        ...state,
        usersList: [...state.usersList, action.payload]
      };
    case USER_LOAD_SUCCESS:
      return {
        ...state
      };
    case USER_EDIT_SUCCESS:
      return {
        ...state,
        usersList: [...state.usersList.map(item => item._id === action.payload._id ? action.payload : item)]
      };
    case RESET_EDITING_USER:
      return {
        ...state
      };
    default:
      return state;
  }
};

export const usersFeatureReducer: UsersReducerState = {
  users: usersReducer
};
