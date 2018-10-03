
import {mergeMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { LoadGallery, GalleryError, GalleryAction,
  REQUEST_DELETE_GALLERY, GalleryDeleteSuccess, REQUEST_CREATE_GALLERY,
  GalleryCreateSuccess, REQUEST_LOAD_GALLERY, GalleryLoadSuccess, REQUEST_EDIT_GALLERY, GalleryEditSuccess } from './gallery.actions';
import { GalleryService } from '../gallery.service';
import { RowsResponse, DataResponse } from '../../core/response.model';
import { GalleryFeatureState } from './gallery.reducer';
import { Observable } from 'rxjs';
import { GalleryModel } from '../gallery.model';


/**
 * The gallery effect class to do some asynchronous actions. Loading of gallery, deleting gallery, creating gallery and updating.
 *
 * @export
 * @class GalleryEffect
 */
@Injectable()
export class GalleryEffect {
  constructor(
    private actions$: Actions,
    private galleryService: GalleryService,
    private store: Store<GalleryFeatureState>,
    private router: Router
  ) { }
  @Effect()
  $requestLoadGalleryEffect = this.actions$
    .ofType(REQUEST_LOAD_GALLERY).pipe(
    map((action: GalleryAction) => action.payload),
    mergeMap(() => {
        return this.galleryService.getGallery().pipe(
          map((response: RowsResponse<GalleryModel>) => {
            if (response.rows) {
              return new LoadGallery(response.rows);
            }
          }))
          .catch((err: any, caught: Observable<GalleryError | LoadGallery>) => {
            this.store.dispatch(new GalleryError(err, REQUEST_LOAD_GALLERY));
            return of();
          });
    }));

  @Effect()
  $requestDeleteGalleryEffect = this.actions$
    .ofType(REQUEST_DELETE_GALLERY).pipe(
    map((action: GalleryAction) => action.payload),
    mergeMap((id: string) => {
      return this.galleryService.removeGallery(id).pipe(
        map((response: DataResponse<GalleryModel>) => {
          if (response.data) {
            return new GalleryDeleteSuccess(response.data);
          }
        }))
        .catch((err: any, caught: Observable<GalleryError | GalleryDeleteSuccess>) => {
          this.store.dispatch(new GalleryError(err, REQUEST_DELETE_GALLERY));
          return of();
        });
    }));

  @Effect()
  $requestCreateGalleryEffect = this.actions$
    .ofType(REQUEST_CREATE_GALLERY).pipe(
    map((action: GalleryAction) => action.payload),
    mergeMap((gallery: GalleryModel) => {
      return this.galleryService.addGallery(gallery).pipe(
        map((response: DataResponse<GalleryModel>) => {
          if (response.data) {
            this.router.navigate(['/admin/gallery']);
            return new GalleryCreateSuccess(response.data);
          }
        }))
        .catch((err: any, caught: Observable<GalleryError | GalleryCreateSuccess>) => {
          this.store.dispatch(new GalleryError(err, REQUEST_CREATE_GALLERY));
          return of();
        });
    })); 

  @Effect()
  $requestEditGalleryEffect = this.actions$
    .ofType(REQUEST_EDIT_GALLERY).pipe(
    map((action: GalleryAction) => action.payload),
    mergeMap((gallery: GalleryModel) => {
      return this.galleryService.editGallery(gallery).pipe(
        map((response: DataResponse<GalleryModel>) => {
          if (response.data) {
            this.router.navigate(['/admin/gallery']);
            return new GalleryEditSuccess(response.data);
          }
        }))
        .catch((err: any, caught: Observable<GalleryError | GalleryLoadSuccess>) => {
          this.store.dispatch(new GalleryError(err, REQUEST_EDIT_GALLERY));
          return of();
        });
    }));
}
