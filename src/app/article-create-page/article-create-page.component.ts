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
  flag: boolean = false
  newArticle: Article = new Article()
  writingUser: User = new User()
  titl: string
  cont: string
  titleInput = (<HTMLInputElement>document.getElementById("article-title-input"))
  contentArea = (<HTMLTextAreaElement> document.getElementById("article-content-input"))
  constructor(private blogdataService: BlogdataService,
    private router: Router) { }
  ngOnInit() {
    if(this.blogdataService.getLoginUser() === null)  this.router.navigateByUrl("/")
    this.writingUser = this.blogdataService.getLoginUser()
    
  }
  out(){
    console.log("outbutton")
    this.blogdataService.setLogout()
  }
  Ptoggle() {
    this.titl = (<HTMLInputElement>document.getElementById("article-title-input")).value
    this.cont = (<HTMLTextAreaElement> document.getElementById("article-content-input")).value
    this.flag = true
    let authE = (<HTMLElement>document.getElementById("article-author"))
    let titlE = (<HTMLElement> document.getElementById("article-title"))
    let contE = (<HTMLElement> document.getElementById("article-content"))
    /*authE.innerHTML= this.writingUser.name
    titlE.innerHTML= this.titl
    contE.innerHTML= this.cont
    */
  }
  confirmButton(){
    this.titl = (<HTMLInputElement>document.getElementById("article-title-input")).value
    this.cont = (<HTMLTextAreaElement> document.getElementById("article-content-input")).value
    console.log("title: "+this.titl)
    console.log("content: "+this.cont)
    
  }
  Wtoggle() {
    this.flag = false
    this.titleInput = (<HTMLInputElement>document.getElementById("article-title-input"))
    this.contentArea = (<HTMLTextAreaElement> document.getElementById("article-content-input"))
    
  }
}
