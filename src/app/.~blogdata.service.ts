import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Article } from './Article';
import { Comment } from './Comment';
import { User } from './User';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BlogdataService {
  private useridUrl = 'api/user/:id';  // URL to web api
  private articlesUrl = 'api/articles';  // URL to web api
  private articlesidUrl = 'api/articles/:id';  // URL to web api
  private commentsUrl = 'api/comments';  // URL to web api
  private commentsidUrl = 'api/comments/:id';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) {  }

  getArticles (): Observable<Article[]> {
​    return this.http.get<Article[]>(this.articlesUrl)
​      .pipe(
​        tap(articles => this.log('fetched articles')),
​        catchError(this.handleError('getArticles', []))
​      );
  }
  getArticleNo404<Data>(id: number): Observable<Article> {
​    const url = `${this.articlesUrl}/?id=${id}`;
​    return this.http.get<Article[]>(url)
​      .pipe(
​        map(articles => articles[0]), // returns a {0|1} element array
​        tap(h => {
​          const outcome = h ? `fetched` : `did not find`;
​          this.log(`${outcome} article id=${id}`);
​        }),
​        catchError(this.handleError<Article>(`getArticle id=${id}`))
​      );
  }

  /** GET hero by id. Will 404 if id not found */
  getArticle(id: number): Observable<Article> {
​    const url = `${this.articlesUrl}/${id}`;
​    return this.http.get<Article>(url).pipe(
​      tap(_ => this.log(`fetched article id=${id}`)),
​      catchError(this.handleError<Article>(`getArticle id=${id}`))
​    );
  }

  /* GET heroes whose name contains search term */
  searchArticles(term: string): Observable<Article[]> {
​    if (!term.trim()) {
​      // if not search term, return empty hero array.
​      return of([]);
​    }
​    return this.http.get<Article[]>(`${this.articlesUrl}/?name=${term}`).pipe(
​      tap(_ => this.log(`found articles matching "${term}"`)),
​      catchError(this.handleError<Article[]>('searchArticles', []))
​    );
  }



}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/



