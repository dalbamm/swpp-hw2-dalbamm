import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogdataService } from '../blogdata.service';
import { Article } from '../Article';

@Component({
  selector: 'app-article-detail-component',
  templateUrl: './article-detail-component.component.html',
  styleUrls: ['./article-detail-component.component.css']
})
export class ArticleDetailComponentComponent implements OnInit {
	article : Article
  constructor(
		  private route: ActivatedRoute,
private		  blogdataService: BlogdataService
		  ) { }

  ngOnInit() {
  	this.getArticle();
  }

  getArticle(): void {
	const id = +this.route.snapshot.paramMap.get('id');
  	this.blogdataService.getArticle(id).subscribe(article => this.article = article);
  }
}
