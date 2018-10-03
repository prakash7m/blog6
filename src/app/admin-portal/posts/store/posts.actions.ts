import { PostModel } from '../post.model';
import { HandledErrorResponse } from '../../core/response.model';
import { MetaState } from '../../core/state.helper';

export const LOAD_POSTS = '[posts] LOAD';
export const REQUEST_LOAD_POSTS = '[posts] REQUEST LOAD';
export const POSTS_BUSY = '[posts] POSTS BUSY';
export const POSTS_ERROR = '[posts] POSTS ERROR';
export const REQUEST_DELETE_POST = '[posts] REQUEST DELETE';
export const POST_DELETE_SUCCESS = '[posts] DELETE SUCCESS';
export const REQUEST_CREATE_POST = '[posts] REQUEST CREATE';
export const POST_CREATE_SUCCESS = '[posts] CREATE SUCCESS';
export const REQUEST_LOAD_POST = '[posts] REQUEST LOAD POST';
export const POST_LOAD_SUCCESS = '[posts] LOAD POST SUCCESS';
export const RESET_EDITING_POST = '[posts] RESET EDITING POST';
export const REQUEST_EDIT_POST = '[posts] REQUEST EDIT POST';
export const POST_EDIT_SUCCESS = '[posts] EDIT POST SUCCESS';

export interface PostAction {
  type: string;
  payload?: any;
}

export class LoadPosts implements PostAction {
  readonly type: string = LOAD_POSTS;
  readonly meta: MetaState<PostModel> = { progress: { [REQUEST_LOAD_POSTS]: false } };
  constructor(public payload: PostModel[]) { }
}

export class RequestLoadPosts implements PostAction {
  readonly type: string = REQUEST_LOAD_POSTS;
  readonly meta: MetaState<PostModel> = { progress: { [REQUEST_LOAD_POSTS]: true } };
  constructor() { }
}

export class PostsBusy implements PostAction {
  readonly type: string = POSTS_BUSY;
  constructor(public payload: boolean) { }
}

export class PostsError implements PostAction {
  readonly type: string = POSTS_ERROR;
  readonly meta: MetaState<PostModel> = { progress: { [this.initiator]: false }, error: { [this.initiator]: this.payload } };
  constructor(public payload: HandledErrorResponse, public initiator: string) { }
}

export class RequestDeletePost implements PostAction {
  readonly type: string = REQUEST_DELETE_POST;
  readonly meta: MetaState<PostModel> = { progress: { [REQUEST_DELETE_POST]: true } };
  constructor(public payload: string) { }
}

export class PostDeleteSuccess implements PostAction {
  readonly type: string = POST_DELETE_SUCCESS;
  readonly meta: MetaState<PostModel> = { progress: { [REQUEST_DELETE_POST]: false } };
  constructor(public payload: PostModel) { }
}

export class RequestCreatePost implements PostAction {
  readonly type: string = REQUEST_CREATE_POST;
  readonly meta: MetaState<PostModel> = { progress: { [REQUEST_CREATE_POST]: true } };
  constructor(public payload: PostModel) { }
}

export class PostCreateSuccess implements PostAction {
  readonly type: string = POST_CREATE_SUCCESS;
  readonly meta: MetaState<PostModel> = { progress: { [REQUEST_CREATE_POST]: false } };
  constructor(public payload: PostModel) { }
}

export class RequestLoadPost implements PostAction {
  readonly type: string = REQUEST_LOAD_POST;
  readonly meta: MetaState<PostModel> = { progress: { [REQUEST_LOAD_POST]: true }, editingModel: null };
  constructor(public payload: string) { }
}

export class PostLoadSuccess implements PostAction {
  readonly type: string = POST_LOAD_SUCCESS;
  readonly meta: MetaState<PostModel> = { progress: { [REQUEST_LOAD_POST]: false }, editingModel: this.payload };
  constructor(public payload: PostModel) { }
}

export class ResetEditingPost implements PostAction {
  readonly type: string = RESET_EDITING_POST;
  constructor() { }
}

export class RequestEditPost implements PostAction {
  readonly type: string = REQUEST_EDIT_POST;
  readonly meta: MetaState<PostModel> = { progress: { [REQUEST_EDIT_POST]: true } };
  constructor(public payload: PostModel) { }
}

export class PostEditSuccess implements PostAction {
  readonly type: string = POST_EDIT_SUCCESS;
  readonly meta: MetaState<PostModel> = { progress: { [REQUEST_EDIT_POST]: false } };
  constructor(public payload: PostModel) { }
}

