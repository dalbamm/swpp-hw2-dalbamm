import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogdataService } from '../blogdata.service';
import { Article } from '../Article';
import { Comment } from '../Comment';

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
      private blogdataService: BlogdataService
		  ) { }

  ngOnInit() {
  	this.getArticle();
  	this.getComments();
  }

  getArticle(): void {
	const id = +this.route.snapshot.paramMap.get('id');
  	this.blogdataService.getArticle(id).subscribe(article => this.article = article);
  }
  getComments(): void {
    //const id = +this.route.snapshot.paramMap.get('id');
      this.blogdataService.getComments().subscribe(comments => this.comments = comments.filter(
        comment => comment.article_id === this.article.id )
        );

    }
}

