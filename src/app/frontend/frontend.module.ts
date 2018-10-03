import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MarkdownModule } from 'ngx-markdown';

import { FrontendRoutingModule } from './frontend-routing.module';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { CategoryTilesComponent } from './category-tiles/category-tiles.component';
import { FooterComponent } from './footer/footer.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { PostTilesComponent } from './post-tiles/post-tiles.component';
import { CategoryHeroComponent } from './category-hero/category-hero.component';
import { ContainerWithSidebarComponent } from './container-with-sidebar/container-with-sidebar.component';
import { ArticleComponent } from './article/article.component';
import { SidebarPanelComponent } from './sidebar-panel/sidebar-panel.component';
import { PostComponent } from './post/post.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostsHomeComponent } from './posts-home/posts-home.component';
import { PostsHomeContainerComponent } from './posts-home-container/posts-home-container.component';
import { PostContainerComponent } from './post-container/post-container.component';
import { ArticleService } from './article/article.service';
import { FrontendComponent } from './frontend.component';


@NgModule({
  imports: [
    CommonModule,
    FrontendRoutingModule,
    HttpModule,
    MarkdownModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    HeroComponent,
    CategoryTilesComponent,
    FooterComponent,
    SubscribeComponent,
    PostTilesComponent,
    CategoryHeroComponent,
    ContainerWithSidebarComponent,
    ArticleComponent,
    SidebarPanelComponent,
    PostComponent,
    SidebarComponent,
    PostsHomeComponent,
    PostsHomeContainerComponent,
    PostContainerComponent,
    FrontendComponent
  ],
  providers: [
    ArticleService
  ]
})
export class FrontendModule { }
