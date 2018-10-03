
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class ArticleService {
    constructor (private http: Http) { }
    getArticle () {
        return this.http.get('/assets/mock/article.md').pipe(
            map(article => article.text()));
    }
}
