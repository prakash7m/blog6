
import {mergeMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { REQUEST_LOAD_CATEGORIES, LoadCategories, CategoriesError, CategoryAction,
  REQUEST_DELETE_CATEGORY, CategoryDeleteSuccess, REQUEST_CREATE_CATEGORY,
  CategoryCreateSuccess, REQUEST_LOAD_CATEGORY, CategoryLoadSuccess, ResetEditingCategory,
  REQUEST_EDIT_CATEGORY, CategoryEditSuccess } from './categories.actions';
import { CategoriesService } from '../categories.service';
import { RowsResponse, DataResponse } from '../../core/response.model';
import { CategoryModel } from '../category.model';
import { CategoriesFeatureState } from './categories.reducer';
import { CategoryCreateModel } from '../category.model';
import { Observable, ObservableInput } from 'rxjs/Observable';


/**
 * The categories effect class to do some asynchronous actions. Loading of categories,
 * deleting categories, creating categories and updating.
 *
 * @export
 * @class CategoriesEffect
 */
@Injectable()
export class CategoriesEffect {
  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService,
    private store: Store<CategoriesFeatureState>,
    private router: Router
  ) { }
  @Effect()
  $requestLoadCategoriesEffect = this.actions$
    .ofType(REQUEST_LOAD_CATEGORIES).pipe(
    map((action: CategoryAction) => action.payload),
    mergeMap(() => {
        return this.categoriesService.getCategories().pipe(
          map((response: RowsResponse<CategoryModel>) => {
            if (response.rows) {
              return new LoadCategories(response.rows);
            }
          }))
          .catch((err: any, caught: Observable<CategoriesError | LoadCategories>) => {
            this.store.dispatch(new CategoriesError(err, REQUEST_LOAD_CATEGORIES));
            return of();
          });
    }));

  @Effect()
  $requestDeleteCategoryEffect = this.actions$
    .ofType(REQUEST_DELETE_CATEGORY).pipe(
    map((action: CategoryAction) => action.payload),
    mergeMap((id: string) => {
      return this.categoriesService.removeCategory(id).pipe(
        map((response: DataResponse<CategoryModel>) => {
          if (response.data) {
            return new CategoryDeleteSuccess(response.data);
          }
        }))
        .catch((err: any, caught: Observable<CategoriesError | CategoryDeleteSuccess>) => {
          this.store.dispatch(new CategoriesError(err, REQUEST_DELETE_CATEGORY));
          return of();
        });
    }));

  @Effect()
  $requestCreateCategoryEffect = this.actions$
    .ofType(REQUEST_CREATE_CATEGORY).pipe(
    map((action: CategoryAction) => action.payload),
    mergeMap((category: CategoryCreateModel) => {
      return this.categoriesService.addCategory(category).pipe(
        map((response: DataResponse<CategoryModel>) => {
          if (response.data) {
            this.router.navigate(['/admin/category']);
            return new CategoryCreateSuccess(response.data);
          }
        }))
        .catch((err: any, caught: Observable<CategoriesError | CategoryCreateSuccess>) => {
          this.store.dispatch(new CategoriesError(err, REQUEST_CREATE_CATEGORY));
          return of();
        });
    }));
  @Effect()
  $requestLoadCategoryEffect = this.actions$
    .ofType(REQUEST_LOAD_CATEGORY).pipe(
    map((action: CategoryAction) => action.payload),
    mergeMap((id: string) => {
      this.store.dispatch(new ResetEditingCategory());
      return this.categoriesService.loadCategory(id).pipe(
        map((response: DataResponse<CategoryModel>) => {
          if (response.data) {
            return new CategoryLoadSuccess(response.data);
          }
        }))
        .catch((err: any, caught: Observable<CategoriesError | CategoryLoadSuccess>) => {
          this.store.dispatch(new CategoriesError(err, REQUEST_LOAD_CATEGORY));
          return of();
        });
    }));

  @Effect()
  $requestEditCategoryEffect = this.actions$
    .ofType(REQUEST_EDIT_CATEGORY).pipe(
    map((action: CategoryAction) => action.payload),
    mergeMap((category: CategoryModel) => {
      return this.categoriesService.editCategory(category).pipe(
        map((response: DataResponse<CategoryModel>) => {
          if (response.data) {
            this.router.navigate(['/admin/category']);
            return new CategoryEditSuccess(response.data);
          }
        }))
        .catch((err: any, caught: Observable<CategoriesError | CategoryLoadSuccess>) => {
          this.store.dispatch(new CategoriesError(err, REQUEST_EDIT_CATEGORY));
          return of();
        });
    }));
}
