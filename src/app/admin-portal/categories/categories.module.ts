import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CoreModule } from '../core/core.module';
import { CategoriesService } from './categories.service';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoriesComponent } from './categories.component';
import { CategoriesEffect } from './store/categories.effects';
import { categoriesReducer } from './store/categories.reducer';


@NgModule({
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    CoreModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('categoriesFeature', {
      categories: categoriesReducer
    }),
    EffectsModule.forFeature([CategoriesEffect])
  ],
  providers: [CategoriesService],
  exports: [CategoryListComponent],
  declarations: [CategoryListComponent, CategoryFormComponent, CategoriesComponent]
})
export class CategoriesModule { }
