import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ngfModule, ngf } from 'angular-file';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { GalleryFormComponent } from './gallery-form/gallery-form.component';
import { CoreModule } from '../core/core.module';
import { GalleryService } from './gallery.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { galleryReducer } from './store/gallery.reducer';
import { GalleryEffect } from './store/gallery.effects';
import { ImageEditComponent } from './image-edit/image-edit.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    GalleryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ngfModule,
    StoreModule.forFeature('galleryFeature', {
      gallery: galleryReducer
    }),
    EffectsModule.forFeature([GalleryEffect])
  ],
  providers: [GalleryService],
  declarations: [GalleryComponent, GalleryListComponent, GalleryFormComponent, ImageEditComponent]
})
export class GalleryModule { }
