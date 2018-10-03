import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostsComponent } from './posts.component';

const routes: Routes = [{
  path: '',
  component: PostsComponent,
  children: [{
    path: '',
    component: PostListComponent,
    data: { title: 'Posts List' }
  }, {
    path: 'create',
    component: PostFormComponent,
    data: { title: 'Post Create' }
  }, {
    path: 'edit/:id',
    component: PostFormComponent,
    data: { title: 'Post Edit' }
  }]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
