import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Column } from '../../core/data-grid/data-grid.model';
import { PostsService } from '../posts.service';
import { PostModel } from '.././post.model';
import { DataGridClass } from '../../core/data-grid/data-grid.class';
import { PostsFeatureState, PostsState } from '../store/posts.reducer';
import { RequestLoadPosts, RequestDeletePost, REQUEST_LOAD_POSTS, REQUEST_DELETE_POST } from '../store/posts.actions';
import { StateHelper } from '../../core/state.helper';
import { HandledErrorResponse } from '../../core/response.model';

@Component({
  selector: 'b-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent extends DataGridClass<PostModel> implements OnInit {
  columns: Column[] = [{
    dataIndex: 'title',
    text: 'Title',
    link: 'edit'
  }, {
    dataIndex: 'slug',
    text: 'Slug'
  }, {
    dataIndex: 'active',
    text: 'Active',
    renderer: function (v, item) {
      return v ? 'Active' : 'Inactive';
    }
  }];
  emptyText = 'Posts not found';
  actions = [{
    text: 'Delete',
    handler: (row) => {
      this.deletePost(row._id);
    }
  }];
  featureState$ = StateHelper.stateForFeature(this.store, 'postsFeature', 'posts');
  busy$: Observable<boolean> = StateHelper.progressFor(this.featureState$, [REQUEST_LOAD_POSTS, REQUEST_DELETE_POST]);
  errorResponse$: Observable<HandledErrorResponse> = StateHelper.errorFor(this.featureState$, [REQUEST_LOAD_POSTS, REQUEST_DELETE_POST]);
  busyMessages: {[key: string]: string} = {
    [REQUEST_LOAD_POSTS]: 'Loading posts',
    [REQUEST_DELETE_POST]: 'Deleting post'
  };
  constructor(private postsService: PostsService, private store: Store<PostsFeatureState>) {
    super();
    this.store.select('postsFeature').subscribe((state: PostsState) => {
      this.rows = state.posts.postsList;
    });
  }

  ngOnInit() {
    if (!this.rows.length) {
      this.loadPosts();
    }
  }

  loadPosts() {
    this.store.dispatch(new RequestLoadPosts());
  }

  deletePost(id) {
    this.store.dispatch(new RequestDeletePost(id));
  }
}
