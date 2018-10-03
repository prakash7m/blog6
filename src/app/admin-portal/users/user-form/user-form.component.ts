import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';


import { CustomValidator } from './custom.validator';
import {
  RequestCreateUser, RequestLoadUser, ResetEditingUser,
  RequestEditUser, REQUEST_CREATE_USER, REQUEST_EDIT_USER, REQUEST_LOAD_USER
} from '../store/users.actions';
import { Observable } from 'rxjs';

import { UsersState } from '../store/users.reducer';
import { UserModel } from '../../core/user.model';
import { FormBase } from '../../core/form.base';
import { StateHelper } from '../../core/state.helper';


@Component({
  selector: 'b-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends FormBase<UserModel> implements OnInit {
  formGroup: FormGroup;
  featureState$ = StateHelper.stateForFeature(this.store, 'usersFeature', 'users');
  errorResponse$ = StateHelper.errorFor(this.featureState$, [REQUEST_LOAD_USER, REQUEST_CREATE_USER, REQUEST_EDIT_USER]);
  busy$: Observable<boolean> = StateHelper.progressFor(this.featureState$, [REQUEST_LOAD_USER, REQUEST_CREATE_USER, REQUEST_EDIT_USER]);
  editingItem$ = StateHelper.editingModelFor(this.featureState$);
  busyMessages: {[key: string]: string} = {
    [REQUEST_LOAD_USER]: 'Loading user',
    [REQUEST_CREATE_USER]: 'Creating user',
    [REQUEST_EDIT_USER]: 'Editing user'
  };
  constructor(route: ActivatedRoute, private fb: FormBuilder, private store: Store<any>) {
    super(route);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  initCreateForm() {
    this.store.dispatch(new ResetEditingUser());
    const passwordControl: FormControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required, Validators.minLength(5)]],
      password: passwordControl,
      confirmPassword: [null, [Validators.required, CustomValidator.match(passwordControl)]]
    });
  }

  initEditForm() {
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required, Validators.minLength(5)]]
    });
  }

  loadForm(id) {
    this.store.dispatch(new RequestLoadUser(id));
  }

  submitCreateForm() {
    const user = {
      username: this.formGroup.get('username').value,
      password: this.formGroup.get('password').value,
      email: this.formGroup.get('email').value
    };
    this.store.dispatch(new RequestCreateUser(user));
  }

  submitEditForm() {
    const user = {
      _id: this.editMode,
      username: this.formGroup.get('username').value,
      email: this.formGroup.get('email').value
    };
    this.store.dispatch(new RequestEditUser(user));
  }
}
