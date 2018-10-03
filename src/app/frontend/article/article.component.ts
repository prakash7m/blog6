import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ArticleService } from './article.service';
import { MarkdownService } from 'ngx-markdown';
import { Observable } from 'rxjs';

@Component({
  selector: 'b-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article$: Observable<string> = this.articleService.getArticle();
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
  }
}
