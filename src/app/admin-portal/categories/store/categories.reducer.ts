import { Action } from '@ngrx/store';

import { CategoryModel } from '../category.model';
import {
  LOAD_CATEGORIES, CategoryAction, CATEGORIES_BUSY, CATEGORIES_ERROR, REQUEST_LOAD_CATEGORIES,
  CATEGORY_DELETE_SUCCESS, REQUEST_DELETE_CATEGORY, REQUEST_CREATE_CATEGORY,
  CATEGORY_CREATE_SUCCESS, CATEGORY_LOAD_SUCCESS, REQUEST_LOAD_CATEGORY, RESET_EDITING_CATEGORY,
  CATEGORY_EDIT_SUCCESS, REQUEST_EDIT_CATEGORY
} from './categories.actions';
import { HandledErrorResponse } from '../../core/response.model';
import { StateHelper, MetaState } from '../../core/state.helper';

export interface CategoriesReducerState {
  categories(state: CategoriesFeatureState, action: CategoryAction): CategoriesFeatureState;
}

export interface CategoriesState {
  categories: CategoriesFeatureState;
}

export interface CategoriesFeatureState {
  categoriesList: CategoryModel[];
  meta: MetaState<CategoryModel>;
}

export const initialCategoriesFeatureState: CategoriesFeatureState = {
  categoriesList: [],
  meta: {}
};

export const categoriesReducer = (pstate: CategoriesFeatureState = initialCategoriesFeatureState,
  action: CategoryAction): CategoriesFeatureState => {
  const state = StateHelper.interceptMeta(pstate, action);
  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        categoriesList: action.payload
      };
    case CATEGORIES_BUSY:
      return {
        ...state,
        categoriesBusy: action.payload
      };
    case CATEGORIES_ERROR:
      return {
        ...state
      };
    case CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        categoriesList: [...state.categoriesList.filter(item => item._id !== action.payload._id)]
      };
    case CATEGORY_CREATE_SUCCESS:
      return {
        ...state,
        categoriesList: [...state.categoriesList, action.payload]
      };
    case CATEGORY_LOAD_SUCCESS:
      return {
        ...state
      };
    case CATEGORY_EDIT_SUCCESS:
      return {
        ...state,
        categoriesList: [...state.categoriesList.map(item => item._id === action.payload._id ? action.payload : item)]
      };
    case RESET_EDITING_CATEGORY:
      return {
        ...state
      };
    default:
      return state;
  }
};

export const categoriesFeatureReducer: CategoriesReducerState = {
  categories: categoriesReducer
};
