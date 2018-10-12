import { Component, OnInit } from '@angular/core';
import { Article } from'../Article'
import { User } from'../User'
import { BlogdataService } from'../blogdata.service'
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.css']
})
export class ArticlesPageComponent implements OnInit {
	articles: Article[]
  users: User[]
  showSignin: boolean
	myObserver = {
		next:x =>console.log('observer got a next value: '+ x )
	};
  constructor(private blogdataService: BlogdataService,
    private router: Router
    ) {}
	
  ngOnInit() {
    //this.getAll();
    if(this.blogdataService.getLoginUser() === null)  this.router.navigateByUrl("/")
    //this.getArticles();
    this.getUsers();
    this.articles = this.blogdataService.getNewArticles();
    this.showSignin = this.router.url !=="/"

  }
  out(){
    console.log("outbutton")
    this.blogdataService.setLogout()
  }
  newarticlebut(){
  	console.log("hello~!")
  }
  
  getAll(): void{	
   this.blogdataService.getArticles().subscribe(articles => this.articles = articles)
   this.blogdataService.getUsers().subscribe(a => this.users = a)
   for(var i = 0 ; i < this.articles.length; i++){
		this.articles[i].author_name = this.users.find(x => x.id === this.articles[i].author_id).name
   }
  }

  getArticles(): void{
	  
   this.blogdataService.getArticles().subscribe(articles => this.articles = articles,
		   
		   );
//   this.blogdataService.getArticles().subscribe(this.myObserver);
  }
  getArticleAuthor(): void{
   this.blogdataService.getArticles().subscribe(articles => this.articles = articles);
  }
/* getUserId(id:number): void{
   this.blogdataService.getUserId(id).subscribe(this.myObserver);
  }
  findUser = users.find(user => user.id === id)
 */

  getUsers(): void{
  	this.blogdataService.getUsers().subscribe(users => this.users = users);
  }
/*    mapid2name(): void{
	  console.log("hi");
  	for(var i = 0 ; i < this.articles.length; i++){
		this.articles[i].author_name = this.getonlyuser(this.articles[i].author_id);
	}
  }
  getonlyuser(id:number): string{
  	  for(var i = 0 ; i < this.users.length; i++){
	  	var tmp = this.users[i];
		if(id == tmp.id)	return tmp.name;
	  }
	  return "";
  }*/
}
