import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPortalComponent } from './admin-portal.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './admin-home/admin-home.component';
import { AuthenticationGuard } from './core/authentication.guard';
import { DefaultLayoutComponent } from './containers';
import { LoginGuard } from './login/login.guard';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
  canActivate: [LoginGuard]
}, {
  path: '',
  component: DefaultLayoutComponent,
  canActivate: [AuthenticationGuard],
  children: [{
    path: '',
    component: HomeComponent,
    data: { title: 'Home' },
  }, {
    path: 'users',
    data: { title: 'Users' },
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'gallery',
    data: { title: 'Gallery' },
    loadChildren: './gallery/gallery.module#GalleryModule'
  },
  {
    path: 'category',
    data: { title: 'Category' },
    loadChildren: './categories/categories.module#CategoriesModule'
  },
  {
    path: 'posts',
    data: { title: 'Posts' },
    loadChildren: './posts/posts.module#PostsModule'
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPortalRoutingModule { }
