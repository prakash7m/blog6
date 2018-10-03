import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [{
  path: '',
  component: CategoriesComponent,
  children: [{
    path: '',
    component: CategoryListComponent,
    data: { title: 'Category List' }
  }, {
    path: 'create',
    component: CategoryFormComponent,
    data: { title: 'Category Create' }
  }, {
    path: 'edit/:id',
    component: CategoryFormComponent,
    data: { title: 'Category Edit' }
  }]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
