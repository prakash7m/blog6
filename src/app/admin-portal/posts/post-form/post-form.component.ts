import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';


import { CustomValidator } from './custom.validator';
import {
  RequestCreatePost, RequestLoadPost, ResetEditingPost,
  RequestEditPost, REQUEST_CREATE_POST, REQUEST_EDIT_POST, REQUEST_LOAD_POST
} from '../store/posts.actions';
import { Observable } from 'rxjs';

import { PostModel } from '.././post.model';
import { FormBase } from '../../core/form.base';
import { StateHelper } from '../../core/state.helper';
import { RequestLoadCategories, REQUEST_LOAD_CATEGORIES } from '../../categories/store/categories.actions';
import { TdTextEditorComponent } from '@covalent/text-editor';


@Component({
  selector: 'b-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent extends FormBase<PostModel> implements OnInit {
  formGroup: FormGroup;
  featureState$ = StateHelper.stateForFeature(this.store, 'postsFeature', 'posts');
  errorResponse$ = StateHelper.errorFor(this.featureState$, [REQUEST_LOAD_POST, REQUEST_CREATE_POST, REQUEST_EDIT_POST]);
  busy$: Observable<boolean> = StateHelper.progressFor(this.featureState$, [REQUEST_LOAD_POST, REQUEST_CREATE_POST, REQUEST_EDIT_POST]);
  editingItem$ = StateHelper.editingModelFor(this.featureState$);
  busyMessages: {[key: string]: string} = {
    [REQUEST_LOAD_POST]: 'Loading post',
    [REQUEST_CREATE_POST]: 'Creating post',
    [REQUEST_EDIT_POST]: 'Editing post'
  };

  categoriesState$ = StateHelper.stateForFeature(this.store, 'categoriesFeature', 'categories');
  categoriesBusy$: Observable<boolean> = StateHelper.progressFor(this.categoriesState$, [REQUEST_LOAD_CATEGORIES]);
  contentEditorOptions: any = {
    lineWrapping: true
  };

  @ViewChild('textEditor') private _textEditor: TdTextEditorComponent;
  content = '';

  constructor(route: ActivatedRoute, private fb: FormBuilder, private store: Store<any>) {
    super(route);
  }
  rows = [{name: 'One Option', _id: '233'}, {name: 'Another Option', _id: '233'}];
  ngOnInit() {
    super.ngOnInit();
    this.store.dispatch(new RequestLoadCategories());
  }

  initCreateForm() {
    this.store.dispatch(new ResetEditingPost());
    this.initEditForm();
  }

  initEditForm() {
    this.formGroup = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(5)]],
      synopsis: [null, []],
      slug: [null, [Validators.required]],
      hero: [null],
      category: [null],
      active: [false],
      meta: [null],
      readtime: [null, [Validators.required, Validators.min(1)]]
    });
  }

  loadForm(id) {
    this.store.dispatch(new RequestLoadPost(id));
  }

  submitCreateForm() {
    this.store.dispatch(new RequestCreatePost({...this.formGroup.value, content: this._textEditor.value }));
  }

  submitEditForm() {
    const post = {
      _id: this.editMode, ...this.formGroup.value, content: this._textEditor.value
    };
    this.store.dispatch(new RequestEditPost(post));
  }

  onPatchValue(item) {
    this.content = item.content;
  }
}
