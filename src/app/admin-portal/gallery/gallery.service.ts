
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { GlobalErrorHandler } from '../core/global-error-handler';
import { Observable } from 'rxjs';
import { RowsResponse, HandledErrorResponse, DataResponse } from '../core/response.model';
import { GalleryModel } from './gallery.model';
import { apiURL } from '../config';

@Injectable()
export class GalleryService {
  constructor(private http: HttpClient, private globalErrorHandler: GlobalErrorHandler) { }

  upload(sendableFormData: FormData) {
    const config = new HttpRequest('POST', `${apiURL}/gallery`, sendableFormData, {
      reportProgress: true,
      withCredentials: true
    });
    return this.http.request(config);
  }

  getGallery(): Observable<RowsResponse<GalleryModel> | HandledErrorResponse> {
    return this.http.get<RowsResponse<GalleryModel>>(`${apiURL}/gallery`, { withCredentials: true }).pipe(
      map((res: RowsResponse<GalleryModel>) => res))
      .catch((err: any, caught: Observable<RowsResponse<GalleryModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  addGallery(image: GalleryModel): Observable<DataResponse<GalleryModel> | HandledErrorResponse> {
    return this.http.post<DataResponse<GalleryModel>>(`${apiURL}/gallery`, image, { withCredentials: true }).pipe(
      map((res: DataResponse<GalleryModel>) => res))
      .catch((err: any, caught: Observable<DataResponse<GalleryModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  removeGallery(id: string): Observable<DataResponse<GalleryModel> | HandledErrorResponse> {
    return this.http.delete<DataResponse<GalleryModel>>(`${apiURL}/gallery/${id}`, { withCredentials: true }).pipe(
      map((res: DataResponse<GalleryModel>) => res))
      .catch((err: any, caught: Observable<DataResponse<GalleryModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  loadGallery(id: string): Observable<DataResponse<GalleryModel> | HandledErrorResponse> {
    return this.http.get<DataResponse<GalleryModel>>(`${apiURL}/gallery/${id}`, { withCredentials: true }).pipe(
      map((res: DataResponse<GalleryModel>) => res))
      .catch((err: any, caught: Observable<DataResponse<GalleryModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }

  editGallery(image: GalleryModel): Observable<DataResponse<GalleryModel> | HandledErrorResponse> {
    return this.http.put<DataResponse<GalleryModel>>(`${apiURL}/gallery/${image._id}`, image, { withCredentials: true }).pipe(
      map((res: DataResponse<GalleryModel>) => res))
      .catch((err: any, caught: Observable<DataResponse<GalleryModel>>) => {
        return this.globalErrorHandler.handleError(err);
      });
  }
}
