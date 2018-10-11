import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogdataService } from '../blogdata.service';
import { Article } from '../Article';
import { Comment } from '../Comment';
import { RouterModule, Routes, Router } from '@angular/router';
import { of } from 'rxjs';


@Component({
  selector: 'app-article-detail-component',
  templateUrl: './article-detail-component.component.html',
  styleUrls: ['./article-detail-component.component.css']
})
export class ArticleDetailComponentComponent implements OnInit {
   article : Article
  private comments : Comment[]
  constructor(
		  private route: ActivatedRoute,
		  private router: Router,
      private blogdataService: BlogdataService
		  ) { }

  ngOnInit() {
    if(this.blogdataService.getLoginUser() === null)  this.router.navigateByUrl("/")
  	this.getArticle();
    this.getComments();
//    this.blogdataService.getNewArticles();
//    this.blogdataService.getNewComments();
  }

  getArticle(): void {
	const id = +this.route.snapshot.paramMap.get('id');
  of(this.blogdataService.getNewArticles()).subscribe(a =>this.article =  a.find(ele => ele.id === id));
  //this.blogdataService.getArticle(id).subscribe(article => this.article = article);
  }
  getComments(): void {
    //const id = +this.route.snapshot.paramMap.get('id');
    of(this.blogdataService.getNewComments()).subscribe(a=>this.comments = a.filter(
      comment => comment.article_id === this.article.id ));
    /*  this.blogdataService.getComments().subscribe(comments => this.comments = comments.filter(
        comment => comment.article_id === this.article.id )
        );
*/
    }
}

