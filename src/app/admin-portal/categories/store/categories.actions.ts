import { CategoryModel } from '../category.model';
import { CategoryCreateModel } from '../category.model';
import { HandledErrorResponse } from '../../core/response.model';
import { MetaState } from '../../core/state.helper';

export const LOAD_CATEGORIES = '[categories] LOAD';
export const REQUEST_LOAD_CATEGORIES = '[categories] REQUEST LOAD';
export const CATEGORIES_BUSY = '[categories] CATEGORIES BUSY';
export const CATEGORIES_ERROR = '[categories] CATEGORIES ERROR';
export const REQUEST_DELETE_CATEGORY = '[categories] REQUEST DELETE';
export const CATEGORY_DELETE_SUCCESS = '[categories] DELETE SUCCESS';
export const REQUEST_CREATE_CATEGORY = '[categories] REQUEST CREATE';
export const CATEGORY_CREATE_SUCCESS = '[categories] CREATE SUCCESS';
export const REQUEST_LOAD_CATEGORY = '[categories] REQUEST LOAD CATEGORY';
export const CATEGORY_LOAD_SUCCESS = '[categories] LOAD CATEGORY SUCCESS';
export const RESET_EDITING_CATEGORY = '[categories] RESET EDITING CATEGORY';
export const REQUEST_EDIT_CATEGORY = '[categories] REQUEST EDIT CATEGORY';
export const CATEGORY_EDIT_SUCCESS = '[categories] EDIT CATEGORY SUCCESS';

export interface CategoryAction {
  type: string;
  payload?: any;
}

export class LoadCategories implements CategoryAction {
  readonly type: string = LOAD_CATEGORIES;
  readonly meta: MetaState<CategoryModel> = { progress: { [REQUEST_LOAD_CATEGORIES]: false } };
  constructor(public payload: CategoryModel[]) { }
}

export class RequestLoadCategories implements CategoryAction {
  readonly type: string = REQUEST_LOAD_CATEGORIES;
  readonly meta: MetaState<CategoryModel> = { progress: { [REQUEST_LOAD_CATEGORIES]: true } };
  constructor() { }
}

export class CategoriesBusy implements CategoryAction {
  readonly type: string = CATEGORIES_BUSY;
  constructor(public payload: boolean) { }
}

export class CategoriesError implements CategoryAction {
  readonly type: string = CATEGORIES_ERROR;
  readonly meta: MetaState<CategoryModel> = { progress: { [this.initiator]: false }, error: { [this.initiator]: this.payload } };
  constructor(public payload: HandledErrorResponse, public initiator: string) { }
}

export class RequestDeleteCategory implements CategoryAction {
  readonly type: string = REQUEST_DELETE_CATEGORY;
  readonly meta: MetaState<CategoryModel> = { progress: { [REQUEST_DELETE_CATEGORY]: true } };
  constructor(public payload: string) { }
}

export class CategoryDeleteSuccess implements CategoryAction {
  readonly type: string = CATEGORY_DELETE_SUCCESS;
  readonly meta: MetaState<CategoryModel> = { progress: { [REQUEST_DELETE_CATEGORY]: false } };
  constructor(public payload: CategoryModel) { }
}

export class RequestCreateCategory implements CategoryAction {
  readonly type: string = REQUEST_CREATE_CATEGORY;
  readonly meta: MetaState<CategoryModel> = { progress: { [REQUEST_CREATE_CATEGORY]: true } };
  constructor(public payload: CategoryCreateModel) { }
}

export class CategoryCreateSuccess implements CategoryAction {
  readonly type: string = CATEGORY_CREATE_SUCCESS;
  readonly meta: MetaState<CategoryModel> = { progress: { [REQUEST_CREATE_CATEGORY]: false } };
  constructor(public payload: CategoryModel) { }
}

export class RequestLoadCategory implements CategoryAction {
  readonly type: string = REQUEST_LOAD_CATEGORY;
  readonly meta: MetaState<CategoryModel> = { progress: { [REQUEST_LOAD_CATEGORY]: true }, editingModel: null };
  constructor(public payload: string) { }
}

export class CategoryLoadSuccess implements CategoryAction {
  readonly type: string = CATEGORY_LOAD_SUCCESS;
  readonly meta: MetaState<CategoryModel> = { progress: { [REQUEST_LOAD_CATEGORY]: false }, editingModel: this.payload };
  constructor(public payload: CategoryModel) { }
}

export class ResetEditingCategory implements CategoryAction {
  readonly type: string = RESET_EDITING_CATEGORY;
  constructor() { }
}

export class RequestEditCategory implements CategoryAction {
  readonly type: string = REQUEST_EDIT_CATEGORY;
  readonly meta: MetaState<CategoryModel> = { progress: { [REQUEST_EDIT_CATEGORY]: true } };
  constructor(public payload: CategoryModel) { }
}

export class CategoryEditSuccess implements CategoryAction {
  readonly type: string = CATEGORY_EDIT_SUCCESS;
  readonly meta: MetaState<CategoryModel> = { progress: { [REQUEST_EDIT_CATEGORY]: false } };
  constructor(public payload: CategoryModel) { }
}

