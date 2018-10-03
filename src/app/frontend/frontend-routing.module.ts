import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontendComponent } from './frontend.component';
import { PostComponent } from './post/post.component';
import { HeroComponent } from './hero/hero.component';

const routes: Routes = [{
  path: '',
  component: FrontendComponent,
  children: [{
    path: 'post',
    component: PostComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
