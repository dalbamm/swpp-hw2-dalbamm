import { Component, OnInit } from '@angular/core';
import { Article } from'../Article'
import { User } from'../User'
import { BlogdataService } from'../blogdata.service'
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-article-create-page',
  templateUrl: './article-create-page.component.html',
  styleUrls: ['./article-create-page.component.css']
})
export class ArticleCreatePageComponent implements OnInit {

  constructor(private blogdataService: BlogdataService,
    private router: Router) { }
  ngOnInit() {
    if(this.blogdataService.getLoginUser() === null)  this.router.navigateByUrl("/")
    
  }

}
