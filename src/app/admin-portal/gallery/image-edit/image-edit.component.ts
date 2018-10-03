import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GalleryModel } from '../gallery.model';
import { FormBase } from '../../core/form.base';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateHelper } from '../../core/state.helper';
import { REQUEST_EDIT_GALLERY, RequestEditGallery, RequestDeleteGallery, REQUEST_DELETE_GALLERY } from '../store/gallery.actions';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'b-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent extends FormBase<GalleryModel> implements OnInit {

  @Input()
  image: GalleryModel;

  @Output()
  cancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  formGroup: FormGroup;
  featureState$ = StateHelper.stateForFeature(this.store, 'galleryFeature', 'gallery');
  errorResponse$ = StateHelper.errorFor(this.featureState$, [REQUEST_EDIT_GALLERY, REQUEST_DELETE_GALLERY]);
  busy$: Observable<boolean> = StateHelper.progressFor(this.featureState$, [REQUEST_EDIT_GALLERY, REQUEST_DELETE_GALLERY]);
  editingItem$ = StateHelper.editingModelFor(this.featureState$);
  busyMessages: { [key: string]: string } = {
    [REQUEST_EDIT_GALLERY]: 'Updating image',
    [REQUEST_DELETE_GALLERY]: 'Deleting image'
  };
  constructor(route: ActivatedRoute, private fb: FormBuilder, private store: Store<any>) {
    super(route);
  }

  ngOnInit() {
    this.editMode = this.image._id;
    this.initEditForm();
    this.formGroup.patchValue(this.image);
  }

  initEditForm() {
    this.formGroup = this.fb.group({
      name: [null, [Validators.required]],
      tags: [null, [Validators.required]]
    });
  }

  submitEditForm() {
    
    const image: GalleryModel = this.image;
    const tags = this.formGroup.get('tags').value;
    image.name = this.formGroup.get('name').value;
    image.tags = Array.isArray(tags) ? tags : tags.split(",").map(tag => tag.trim());
    this.store.dispatch(new RequestEditGallery(image));
  }

  onCancel() {
    this.cancel.emit(true);
  }

  saveDisabled() {
    return this.image.name == this.formGroup.get('name').value && this.image.tags == this.formGroup.get('tags').value;
  }

  onDelete(image) {
    this.store.dispatch(new RequestDeleteGallery(this.image._id));
  }
}
