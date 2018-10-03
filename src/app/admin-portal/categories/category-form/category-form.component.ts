import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';


import { CustomValidator } from './custom.validator';
import {
  RequestCreateCategory, RequestLoadCategory, ResetEditingCategory,
  RequestEditCategory, REQUEST_CREATE_CATEGORY, REQUEST_EDIT_CATEGORY, REQUEST_LOAD_CATEGORY
} from '../store/categories.actions';
import { Observable } from 'rxjs';

import { CategoriesState } from '../store/categories.reducer';
import { CategoryModel } from '../category.model';
import { FormBase } from '../../core/form.base';
import { StateHelper } from '../../core/state.helper';


@Component({
  selector: 'b-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent extends FormBase<CategoryModel> implements OnInit {
  formGroup: FormGroup;
  featureState$ = StateHelper.stateForFeature(this.store, 'categoriesFeature', 'categories');
  errorResponse$ = StateHelper.errorFor(this.featureState$, [REQUEST_LOAD_CATEGORY, REQUEST_CREATE_CATEGORY, REQUEST_EDIT_CATEGORY]);
  busy$: Observable<boolean> = StateHelper.progressFor(this.featureState$, [REQUEST_LOAD_CATEGORY, REQUEST_CREATE_CATEGORY, REQUEST_EDIT_CATEGORY]);
  editingItem$ = StateHelper.editingModelFor(this.featureState$);
  busyMessages: {[key: string]: string} = {
    [REQUEST_LOAD_CATEGORY]: 'Loading category',
    [REQUEST_CREATE_CATEGORY]: 'Creating category',
    [REQUEST_EDIT_CATEGORY]: 'Editing category'
  };
  constructor(route: ActivatedRoute, private fb: FormBuilder, private store: Store<any>) {
    super(route);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  initCreateForm() {
    this.store.dispatch(new ResetEditingCategory());
    this.formGroup = this.fb.group({     
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null, []]
    });
  }

  initEditForm() {
    this.formGroup = this.fb.group({
      name: [null, [Validators.required]],
      description: [null]
    });
  }

  loadForm(id) {
    this.store.dispatch(new RequestLoadCategory(id));
  }
  
  submitCreateForm() {
    const category = {
      name: this.formGroup.get('name').value,
      description: this.formGroup.get('description').value
    };
    this.store.dispatch(new RequestCreateCategory(category));
  }

  submitEditForm() {
    const category = {
      _id: this.editMode,
      name: this.formGroup.get('name').value,
      description: this.formGroup.get('description').value
    };
    this.store.dispatch(new RequestEditCategory(category));
  }
}
