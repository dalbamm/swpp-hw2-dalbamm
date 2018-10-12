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
  private userUrl = 'api/user';  // URL to web api
  private useridUrl = 'api/user/:id';  // URL to web api
  private articlesUrl = 'api/articles';  // URL to web api
  private articlesidUrl = 'api/articles/:id';  // URL to web api
  private commentsUrl = 'api/comments';  // URL to web api
  private commentsidUrl = 'api/comments/:id';  // URL to web api
  private currentloginuser : User  = null
  private newArticles : Article[]
  private newComments : Comment[]
  private numArticles :number
  private numComments :number
  public recentlyCreated : number = -1
  constructor(private http: HttpClient, private messageService: MessageService) { 
    this.getArticles().subscribe(a => this.newArticles = (a.filter(elem => this.authorName(elem))))
    this.getComments().subscribe(a => this.newComments = (a.filter(elem => this.authorName(elem))))
  }
  getNumArticles() :number {
    return this.numArticles
  }
  getNumComments() :number {
    console.log("get: "+ this.numComments)
    return this.numComments
  }
  setNumArticles(newnum: number)  {
    this.numArticles =newnum
  }
  setNumComments(newnum :number) {
    console.log("set: "+ newnum)
    this.numComments = newnum
    console.log("set2: "+ this.numComments)

  }
  getNewArticles(): Article[]{
    this.getArticles().subscribe(a => this.newArticles = (a.filter(elem => this.authorName(elem))))
    //this.numArticles = this.newArticles.length
    return this.newArticles;
  }
  getNewComments(): Comment[]{
    this.getComments().subscribe(a => this.newComments = (a.filter(elem => this.authorName(elem))))
    //this.numComments = this.newComments.length
    return this.newComments.copyWithin(0,0);
  }
  authorName(art: Article | Comment): boolean{
     this.getUsers().subscribe(a => (art.author_name = (a.find(b => b.id === art.author_id).name)));
     return true;
  }
  getLoginUser(): User {
    return this.currentloginuser
  }
  setLogout(){
    this.updateSign(this.currentloginuser,false).subscribe(a=>a)
    this.currentloginuser=null
  }
  setLoginUser(user: User){
    this.currentloginuser = user;
    this.updateSign(this.currentloginuser,true).subscribe(a=>a)
  }
  getAll (): Observable<Article[]> {//articlesUrl
    ​    return this.http.get<Article[]>(this.articlesUrl)
    ​      .pipe(
    ​        tap(articles => this.log('fetched articles')),
    ​        catchError(this.handleError('getArticles', []))
    ​      );
      }
  getArticles (): Observable<Article[]> {//articlesUrl
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
  getArticle(id: number): Observable<Article> { //articles/:id
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
  
  getUsers (): Observable<User[]> {//useridUrl
​    return this.http.get<User[]>(this.userUrl)
​      .pipe(
​        tap(users => this.log('fetched users')),
​        catchError(this.handleError('getUsers', []))
​      );
  }
  getUserId(id: number): Observable<User> { //articles/:id
​    const url = `${this.userUrl}/${id}`;
​    return this.http.get<User>(url).pipe(
​      tap(_ => this.log(`fetched user id=${id}`)),
​      catchError(this.handleError<User>(`getUserId=${id}`))
​    );
  }


  getComments (): Observable<Comment[]> {
​    return this.http.get<Comment[]>(this.commentsUrl)
​      .pipe(
​        tap(commentes => this.log('fetched comments')),
​        catchError(this.handleError('getComments', []))
​      );
  }
 
  getCommentsId (id: number): Observable<Comment[]> {
​    const url = `${this.commentsUrl}/${id}`;
​    return this.http.get<Comment[]>(url)
​      .pipe(
​        tap(commentesid => this.log('fetched commentsid')),
​        catchError(this.handleError('getCommentsId', []))
​      );
  }

  addArticle (article: Article): Observable<Article> {
    return this.http.post<Article>(this.articlesUrl, article, httpOptions).pipe(
      tap((article: Article) => this.log(`added article w/ id=${article.id}`)),
      catchError(this.handleError<Article>('addArticle'))
    );
  }

  addComment (comment: Comment): Observable<Comment> {
    console.log(this.commentsUrl)
    console.log(comment.id)
    return this.http.post<Comment>(this.commentsUrl, comment, httpOptions).pipe(
      tap((comment: Comment) => this.log(`added comment w/ id=${comment.id}`)),
      catchError(this.handleError<Comment>('addComment'))
    );
  }

  updateSign (user: User, what: boolean): Observable<any> {
    user.signed_in=what;
    let userarr = this.getUserId
    return this.http.put(this.userUrl + "/" + user.id, user, httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }
  
  updateArticle (article: Article): Observable<any> {
    return this.http.put(this.articlesUrl+"/"+article.id, article, httpOptions).pipe(
      tap(_ => this.log(`updated article id=${article.id}`)),
      catchError(this.handleError<any>('update article'))
    );
  }


  updateComment (comment: Comment): Observable<any> {
    
    return this.http.put(this.commentsUrl+"/"+comment.id, comment, httpOptions).pipe(
      tap(_ => this.log(`updated comment id=${comment.id}`)),
      catchError(this.handleError<any>('update comment'))
    );
  }






  deleteArticle (article: Article | number): Observable<Article> {
    const id = typeof article === 'number' ? article : article.id;
    const url = `${this.articlesUrl}/${id}`;

    return this.http.delete<Article>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted article id=${id}`)),
      catchError(this.handleError<Article>('deleteArticle'))
    );
  }
  deleteComment (comment: Comment | number): Observable<Comment> {
    const id = typeof comment === 'number' ? comment : comment.id;
    const url = `${this.commentsUrl}/${id}`;

    return this.http.delete<Comment>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted comment id=${id}`)),
      catchError(this.handleError<Comment>('deleteComment'))
    );
  }

private handleError<T> (operation = 'operation', result?: T) {

​    return (error: any): Observable<T> => {

​      // TODO: send the error to remote logging infrastructure

​      console.error(error); // log to console instead

​      // TODO: better job of transforming error for user consumption

​      this.log(`${operation} failed: ${error.message}`);

​      // Let the app keep running by returning an empty result.

​      return of(result as T);

​    };

  }

  /** Log a HeroService message with the MessageService */

  private log(message: string) {

​    this.messageService.add(`BlogdataService: ${message}`);

  }



}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

  /** POST: add a new hero to the server */
/*  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
*/
  /** DELETE: delete the hero from the server */
/*  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
*/
  /** PUT: update the hero on the server */
/*  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

*/
