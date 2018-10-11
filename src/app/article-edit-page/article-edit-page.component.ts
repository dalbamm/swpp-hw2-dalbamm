import { Component, OnInit } from '@angular/core';
import { Article } from'../Article'
import { User } from'../User'
import { BlogdataService } from'../blogdata.service'
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-article-edit-page',
  templateUrl: './article-edit-page.component.html',
  styleUrls: ['./article-edit-page.component.css']
})
export class ArticleEditPageComponent implements OnInit {

  constructor(	  private router: Router,
    private blogdataService: BlogdataService
) { }

  ngOnInit() {
    if(this.blogdataService.getLoginUser() === null)  this.router.navigateByUrl("/")
  	
  }

}
