import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { CoreModule } from '../core/core.module';
import { UsersService } from './users.service';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersComponent } from './users.component';
import { UsersEffect } from './store/users.effects';
import { usersReducer } from './store/users.reducer';


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    CoreModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('usersFeature', {
      users: usersReducer
    }),
    EffectsModule.forFeature([UsersEffect])
  ],
  providers: [UsersService],
  exports: [UserListComponent],
  declarations: [UserListComponent, UserFormComponent, UsersComponent]
})
export class UsersModule { }
