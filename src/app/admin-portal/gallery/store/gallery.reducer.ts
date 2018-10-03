import { Action } from '@ngrx/store';

import {
  LOAD_GALLERY, GalleryAction, GALLERY_ERROR,
  GALLERY_DELETE_SUCCESS, REQUEST_DELETE_GALLERY, REQUEST_CREATE_GALLERY,
  GALLERY_CREATE_SUCCESS, GALLERY_LOAD_SUCCESS, REQUEST_LOAD_GALLERY, RESET_EDITING_GALLERY,
  GALLERY_EDIT_SUCCESS, REQUEST_EDIT_GALLERY
} from './gallery.actions';
import { HandledErrorResponse } from '../../core/response.model';
import { StateHelper, MetaState } from '../../core/state.helper';
import { GalleryModel } from '../gallery.model';

export interface GalleryReducerState {
  gallery(state: GalleryFeatureState, action: GalleryAction): GalleryFeatureState;
}

export interface GalleryState {
  gallery: GalleryFeatureState;
}

export interface GalleryFeatureState {
  galleryList: GalleryModel[];
  meta: MetaState<GalleryModel>;
}

export const initialGalleryFeatureState: GalleryFeatureState = {
  galleryList: [],
  meta: {}
};

export const galleryReducer = (pstate: GalleryFeatureState = initialGalleryFeatureState, action: GalleryAction): GalleryFeatureState => {
  const state = StateHelper.interceptMeta(pstate, action);
  switch (action.type) {
    case LOAD_GALLERY:
      return {
        ...state,
        galleryList: action.payload
      };
    case GALLERY_DELETE_SUCCESS:
      return {
        ...state,
        galleryList: [...state.galleryList.filter(item => item._id !== action.payload._id)]
      };
    case GALLERY_CREATE_SUCCESS:
      return {
        ...state,
        galleryList: [...state.galleryList, action.payload]
      };
    case GALLERY_EDIT_SUCCESS:
      return {
        ...state,
        galleryList: [...state.galleryList.map(item => item._id === action.payload._id ? action.payload : item)]
      };
    default:
      return state;
  }
};

export const galleryFeatureReducer: GalleryReducerState = {
  gallery: galleryReducer
};
