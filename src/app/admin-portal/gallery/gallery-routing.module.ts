import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { GalleryFormComponent } from './gallery-form/gallery-form.component';

const routes: Routes = [{
  path: '',
  component: GalleryComponent,
  children: [{
    path: '',
    component: GalleryListComponent,
    data: { title: 'Gallery List' }
  }, {
    path: 'create',
    component: GalleryFormComponent,
    data: { title: 'Add to Gallery' }
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
