import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Column } from '../../core/data-grid/data-grid.model';
import { CategoriesService } from '../categories.service';
import { CategoryModel } from '../category.model';
import { DataGridClass } from '../../core/data-grid/data-grid.class';
import { CategoriesFeatureState, CategoriesState } from '../store/categories.reducer';
import { RequestLoadCategories, RequestDeleteCategory, REQUEST_LOAD_CATEGORIES, REQUEST_DELETE_CATEGORY } from '../store/categories.actions';
import { StateHelper } from '../../core/state.helper';
import { HandledErrorResponse } from '../../core/response.model';

@Component({
  selector: 'b-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent extends DataGridClass<CategoryModel> implements OnInit {
  columns: Column[] = [{
    dataIndex: 'name',
    text: 'Name',
    link: 'edit'
  }, {
    dataIndex: 'description',
    text: 'Description'
  }];
  emptyText = 'Categories not found';
  actions = [{
    text: 'Delete',
    handler: (row) => {
      this.deleteCategory(row._id);
    }
  }];
  featureState$ = StateHelper.stateForFeature(this.store, 'categoriesFeature', 'categories');
  busy$: Observable<boolean> = StateHelper.progressFor(this.featureState$, [REQUEST_LOAD_CATEGORIES, REQUEST_DELETE_CATEGORY]);
  errorResponse$: Observable<HandledErrorResponse> = StateHelper.errorFor(this.featureState$, [REQUEST_LOAD_CATEGORIES, REQUEST_DELETE_CATEGORY]);
  busyMessages: {[key: string]: string} = {
    [REQUEST_LOAD_CATEGORIES]: "Loading categories",
    [REQUEST_DELETE_CATEGORY]: "Deleting category"
  };
  constructor(private categoriesService: CategoriesService, private store: Store<CategoriesFeatureState>) {
    super();
    this.store.select('categoriesFeature').subscribe((state: CategoriesState) => {
      this.rows = state.categories.categoriesList;
    });
  }

  ngOnInit() {
    if (!this.rows.length) {
      this.loadCategories();
    }
  }

  loadCategories() {
    this.store.dispatch(new RequestLoadCategories());
  }

  deleteCategory(id) {
    this.store.dispatch(new RequestDeleteCategory(id));
  }
}
