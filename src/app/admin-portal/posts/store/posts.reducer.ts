import { PostModel } from '.././post.model';
import {
  LOAD_POSTS, PostAction, POSTS_BUSY, POSTS_ERROR,
  POST_DELETE_SUCCESS,
  POST_CREATE_SUCCESS, POST_LOAD_SUCCESS, RESET_EDITING_POST,
  POST_EDIT_SUCCESS
} from './posts.actions';
import { StateHelper, MetaState } from '../../core/state.helper';

export interface PostsReducerState {
  posts(state: PostsFeatureState, action: PostAction): PostsFeatureState;
}

export interface PostsState {
  posts: PostsFeatureState;
}

export interface PostsFeatureState {
  postsList: PostModel[];
  meta: MetaState<PostModel>;
}

export const initialPostsFeatureState: PostsFeatureState = {
  postsList: [],
  meta: {}
};

export const postsReducer = (pstate: PostsFeatureState = initialPostsFeatureState, action: PostAction): PostsFeatureState => {
  const state = StateHelper.interceptMeta(pstate, action);
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        postsList: action.payload
      };
    case POSTS_BUSY:
      return {
        ...state,
        postsBusy: action.payload
      };
    case POSTS_ERROR:
      return {
        ...state
      };
    case POST_DELETE_SUCCESS:
      return {
        ...state,
        postsList: [...state.postsList.filter(item => item._id !== action.payload._id)]
      };
    case POST_CREATE_SUCCESS:
      return {
        ...state,
        postsList: [...state.postsList, action.payload]
      };
    case POST_LOAD_SUCCESS:
      return {
        ...state
      };
    case POST_EDIT_SUCCESS:
      return {
        ...state,
        postsList: [...state.postsList.map(item => item._id === action.payload._id ? action.payload : item)]
      };
    case RESET_EDITING_POST:
      return {
        ...state
      };
    default:
      return state;
  }
};

export const postsFeatureReducer: PostsReducerState = {
  posts: postsReducer
};
