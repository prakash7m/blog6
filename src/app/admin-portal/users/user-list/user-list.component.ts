import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Column } from '../../core/data-grid/data-grid.model';
import { UsersService } from '../users.service';
import { UserModel } from '../../core/user.model';
import { DataGridClass } from '../../core/data-grid/data-grid.class';
import { UsersFeatureState, UsersState } from '../store/users.reducer';
import { RequestLoadUsers, RequestDeleteUser, REQUEST_LOAD_USERS, REQUEST_DELETE_USER } from '../store/users.actions';
import { StateHelper } from '../../core/state.helper';
import { HandledErrorResponse } from '../../core/response.model';

@Component({
  selector: 'b-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends DataGridClass<UserModel> implements OnInit {
  columns: Column[] = [{
    dataIndex: 'username',
    text: 'Username',
    link: 'edit'
  }, {
    dataIndex: 'fullname',
    text: 'Full Name'
  }, {
    dataIndex: 'email',
    text: 'Email'
  }];
  emptyText = 'Users not found';
  actions = [{
    text: 'Delete',
    handler: (row) => {
      this.deleteUser(row._id);
    }
  }];
  featureState$ = StateHelper.stateForFeature(this.store, 'usersFeature', 'users');
  busy$: Observable<boolean> = StateHelper.progressFor(this.featureState$, [REQUEST_LOAD_USERS, REQUEST_DELETE_USER]);
  errorResponse$: Observable<HandledErrorResponse> = StateHelper.errorFor(this.featureState$, [REQUEST_LOAD_USERS, REQUEST_DELETE_USER]);
  busyMessages: {[key: string]: string} = {
    [REQUEST_LOAD_USERS]: 'Loading users',
    [REQUEST_DELETE_USER]: 'Deleting user'
  };
  constructor(private usersService: UsersService, private store: Store<UsersFeatureState>) {
    super();
    this.store.select('usersFeature').subscribe((state: UsersState) => {
      this.rows = state.users.usersList;
    });
  }

  ngOnInit() {
    if (!this.rows.length) {
      this.loadUsers();
    }
  }

  loadUsers() {
    this.store.dispatch(new RequestLoadUsers());
  }

  deleteUser(id) {
    this.store.dispatch(new RequestDeleteUser(id));
  }
}
