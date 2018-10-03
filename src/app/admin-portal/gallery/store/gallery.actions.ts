import { GalleryModel } from '../gallery.model';
import { HandledErrorResponse } from '../../core/response.model';
import { MetaState } from '../../core/state.helper';


export const LOAD_GALLERY = '[gallery] LOAD';
export const REQUEST_LOAD_GALLERY = '[gallery] REQUEST LOAD';
export const GALLERY_ERROR = '[gallery] GALLERY ERROR';
export const REQUEST_DELETE_GALLERY = '[gallery] REQUEST DELETE';
export const GALLERY_DELETE_SUCCESS = '[gallery] DELETE SUCCESS';
export const REQUEST_CREATE_GALLERY = '[gallery] REQUEST CREATE';
export const GALLERY_CREATE_SUCCESS = '[gallery] CREATE SUCCESS';
export const GALLERY_LOAD_SUCCESS = '[gallery] LOAD GALLERY SUCCESS';
export const RESET_EDITING_GALLERY = '[gallery] RESET EDITING GALLERY';
export const REQUEST_EDIT_GALLERY = '[gallery] REQUEST EDIT GALLERY';
export const GALLERY_EDIT_SUCCESS = '[gallery] EDIT GALLERY SUCCESS';

export interface GalleryAction {
  type: string;
  payload?: any;
}

export class LoadGallery implements GalleryAction {
  readonly type: string = LOAD_GALLERY;
  readonly meta: MetaState<GalleryModel> = { progress: { [REQUEST_LOAD_GALLERY]: false } };
  constructor(public payload: GalleryModel[]) { }
}

export class GalleryError implements GalleryAction {
  readonly type: string = GALLERY_ERROR;
  readonly meta: MetaState<GalleryModel> = { progress: { [this.initiator]: false }, error: { [this.initiator]: this.payload } };
  constructor(public payload: HandledErrorResponse, public initiator: string) { }
}

export class RequestDeleteGallery implements GalleryAction {
  readonly type: string = REQUEST_DELETE_GALLERY;
  readonly meta: MetaState<GalleryModel> = { progress: { [REQUEST_DELETE_GALLERY]: true } };
  constructor(public payload: string) { }
}

export class GalleryDeleteSuccess implements GalleryAction {
  readonly type: string = GALLERY_DELETE_SUCCESS;
  readonly meta: MetaState<GalleryModel> = { progress: { [REQUEST_DELETE_GALLERY]: false } };
  constructor(public payload: GalleryModel) { }
}

export class RequestCreateGallery implements GalleryAction {
  readonly type: string = REQUEST_CREATE_GALLERY;
  readonly meta: MetaState<GalleryModel> = { progress: { [REQUEST_CREATE_GALLERY]: true } };
  constructor(public payload: GalleryModel) { }
}

export class GalleryCreateSuccess implements GalleryAction {
  readonly type: string = GALLERY_CREATE_SUCCESS;
  readonly meta: MetaState<GalleryModel> = { progress: { [REQUEST_CREATE_GALLERY]: false } };
  constructor(public payload: GalleryModel) { }
}

export class RequestLoadGallery implements GalleryAction {
  readonly type: string = REQUEST_LOAD_GALLERY;
  readonly meta: MetaState<GalleryModel> = { progress: { [REQUEST_LOAD_GALLERY]: true } };
  constructor() { }
}

export class GalleryLoadSuccess implements GalleryAction {
  readonly type: string = GALLERY_LOAD_SUCCESS;
  readonly meta: MetaState<GalleryModel> = { progress: { [REQUEST_LOAD_GALLERY]: false }, editingModel: this.payload };
  constructor(public payload: GalleryModel) { }
}

export class ResetEditingGallery implements GalleryAction {
  readonly type: string = RESET_EDITING_GALLERY;
  constructor() { }
}

export class RequestEditGallery implements GalleryAction {
  readonly type: string = REQUEST_EDIT_GALLERY;
  readonly meta: MetaState<GalleryModel> = { progress: { [REQUEST_EDIT_GALLERY]: true } };
  constructor(public payload: GalleryModel) { }
}

export class GalleryEditSuccess implements GalleryAction {
  readonly type: string = GALLERY_EDIT_SUCCESS;
  readonly meta: MetaState<GalleryModel> = { progress: { [REQUEST_EDIT_GALLERY]: false } };
  constructor(public payload: GalleryModel) { }
}

