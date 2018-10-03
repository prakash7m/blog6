
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

import { RowsResponse, HandledErrorResponse, DataResponse } from '../core/response.model';
import { apiURL } from '../config';
import { CategoryModel } from './category.model';
import { GlobalErrorHandler } from '../core/global-error-handler';
import { CategoryCreateModel } from './category.model';


/**
 * Categories service for api operation
 *
 * @export
 * @class CategoriesService
 */
@Injectable()
export class CategoriesService {
  constructor(private http: HttpClient, private globalErrorHandler: GlobalErrorHandler) { }
  /**
   * Get the list of categories
   *
   * @returns {(Observable<RowsResponse<CategoryModel> | HandledErrorResponse>)}
   * @memberof CategoriesService
   */
  getCategories(): Observable<RowsResponse<CategoryModel> | HandledErrorResponse> {
    return this.http.get<RowsResponse<CategoryModel>>(`${apiURL}/category`, { withCredentials: true }).pipe(
      map((res: RowsResponse<CategoryModel>) => res))
      .catch((err: any, caught: Observable<RowsResponse<CategoryModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  /**
   * Add Category
   *
   * @param {string} categoryname
   * @param {string} email
   * @param {string} password
   * @returns {(Observable<DataResponse<CategoryModel> | HandledErrorResponse>)}
   * @memberof CategoriesService
   */
  addCategory(category: CategoryCreateModel): Observable<DataResponse<CategoryModel> | HandledErrorResponse> {
    return this.http.post<DataResponse<CategoryModel>>(`${apiURL}/category`, category, { withCredentials: true }).pipe(
      map((res: DataResponse<CategoryModel>) => res))
      .catch((err: any, caught: Observable<DataResponse<CategoryModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  /**
   * Delete category by id
   *
   * @param {string} id
   * @returns {(Observable<DataResponse<CategoryModel> | HandledErrorResponse>)}
   * @memberof CategoriesService
   */
  removeCategory(id: string): Observable<DataResponse<CategoryModel> | HandledErrorResponse> {
    return this.http.delete<DataResponse<CategoryModel>>(`${apiURL}/category/${id}`, { withCredentials: true }).pipe(
      map((res: DataResponse<CategoryModel>) => res))
      .catch((err: any, caught: Observable<DataResponse<CategoryModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  loadCategory(id: string): Observable<DataResponse<CategoryModel> | HandledErrorResponse> {
    return this.http.get<DataResponse<CategoryModel>>(`${apiURL}/category/${id}`, { withCredentials: true }).pipe(
      map((res: DataResponse<CategoryModel>) => res))
      .catch((err: any, caught: Observable<DataResponse<CategoryModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  editCategory(category: CategoryModel): Observable<DataResponse<CategoryModel> | HandledErrorResponse> {
    return this.http.put<DataResponse<CategoryModel>>(`${apiURL}/category/${category._id}`, category, { withCredentials: true }).pipe(
      map((res: DataResponse<CategoryModel>) => res))
      .catch((err: any, caught: Observable<DataResponse<CategoryModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }
}
