import { Component, OnInit } from '@angular/core';
import { Article } from'../Article'
import { User } from'../User'
import { BlogdataService } from'../blogdata.service'
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { ArticlesPageComponent } from '../articles-page/articles-page.component';

@Component({
  selector: 'app-article-edit-page',
  templateUrl: './article-edit-page.component.html',
  styleUrls: ['./article-edit-page.component.css']
})
export class ArticleEditPageComponent implements OnInit {
  flag: boolean = false
  nowArticle: Article
  newArticle: Article = new Article()
  writingUser: User = new User()
  titl: string
  cont: string
  titleInput = (<HTMLInputElement>document.getElementById("article-title-input"))
  contentArea = (<HTMLTextAreaElement> document.getElementById("article-content-input"))
  articlenum: number
  articleArray: Article[]
  id = +this.route.snapshot.paramMap.get('id');
  init_titl: string
  init_cont: string
  constructor(private blogdataService: BlogdataService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit() {
    if(this.blogdataService.getLoginUser() === null)  this.router.navigateByUrl("/")
    this.writingUser = this.blogdataService.getLoginUser()
    this.blogdataService.getArticle(this.id).subscribe(a=> (this.nowArticle=a)&&
    (this.getdata(a)&&this.getdata_b(a)&&this.blogdataService.authorName(a)))
    
  }
  out(){
    console.log("outbutton")
    this.blogdataService.setLogout()
  }
  getdata(mat: Article): boolean{
    this.titl = mat.title
    this.cont = mat.content
    return true
  }
  getdata_b(mat: Article): boolean{
    this.init_titl = mat.title
    this.init_cont = mat.content
    return true
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
    if(this.titl === "" || this.cont === "")  return
    this.newArticle.author_id=this.nowArticle.id
    this.newArticle.author_name=this.nowArticle.author_name
    this.newArticle.title=this.titl
    this.newArticle.content=this.cont
    this.newArticle.id=this.nowArticle.id
    console.log(this.newArticle)
  
    this.blogdataService.updateArticle(this.newArticle).subscribe(a=>console.log(a))
    this.blogdataService.getArticles().subscribe(a=>a)
    this.router.navigateByUrl("/articles/"+this.newArticle.id)
    //console.log(this.newArticle)
    
  }
  backEdit(){
    if(this.init_cont === this.cont && this.init_titl === this.titl)
      {this.router.navigateByUrl("/articles/"+this.id) }
    else{
      let res = confirm("Are you sure? The change will be lost.")
      if(res) this.router.navigateByUrl("/articles/"+this.id)
    }
  }
  Wtoggle() {
    this.flag = false
    this.titleInput = (<HTMLInputElement>document.getElementById("article-title-input"))
    this.contentArea = (<HTMLTextAreaElement> document.getElementById("article-content-input"))
    
  }
  
}

/*import { Component, OnInit } from '@angular/core';
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

  out(){
    console.log("outbutton")
    this.blogdataService.setLogout()
  }
}
*/