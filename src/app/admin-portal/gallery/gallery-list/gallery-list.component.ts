import { Component, OnInit } from '@angular/core';
import { StateHelper } from '../../core/state.helper';
import { Observable } from 'rxjs';
import { HandledErrorResponse } from '../../core/response.model';
import { Store } from '@ngrx/store';
import { DataGridClass } from '../../core/data-grid/data-grid.class';
import { GalleryService } from '../gallery.service';
import { RequestLoadGallery, RequestDeleteGallery, REQUEST_LOAD_GALLERY,
  REQUEST_DELETE_GALLERY, REQUEST_EDIT_GALLERY } from '../store/gallery.actions';
import { mediaURL } from '../../config';

@Component({
  selector: 'b-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss']
})
export class GalleryListComponent extends DataGridClass<any> implements OnInit {
  featureState$ = StateHelper.stateForFeature(this.store, 'galleryFeature', 'gallery');
  busy$: Observable<boolean> = StateHelper.progressFor(this.featureState$, [REQUEST_LOAD_GALLERY]);
  errorResponse$: Observable<HandledErrorResponse> = StateHelper.errorFor(this.featureState$,
    [REQUEST_LOAD_GALLERY, REQUEST_DELETE_GALLERY, REQUEST_EDIT_GALLERY]);
  busyMessages: {[key: string]: string} = {
    [REQUEST_LOAD_GALLERY]: 'Loading gallery'
  };
  constructor(private usersService: GalleryService, private store: Store<any>) {
    super();
    this.featureState$.subscribe((gallery) => {
      this.rows = gallery.galleryList;
    });
  }

  ngOnInit() {
    if (!this.rows.length) {
      this.loadGallery();
    }
  }

  loadGallery() {
    this.store.dispatch(new RequestLoadGallery());
  }

  deleteImage(id) {
    this.store.dispatch(new RequestDeleteGallery(id));
  }

  getMedia(file) {
    return `${mediaURL}/${file.filename}`;
  }

  onImageUpdate(row) {
    console.log(row);
  }
}
