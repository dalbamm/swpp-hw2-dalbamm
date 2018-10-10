import { Component, OnInit } from '@angular/core';
import { Article } from'../Article'
import { User } from'../User'
import { BlogdataService } from'../blogdata.service'

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.css']
})
export class ArticlesPageComponent implements OnInit {
	articles: Article[]
	users: User[]
  constructor(private blogdataService: BlogdataService) {}
	
  ngOnInit() {
	  this.getArticles();
	  this.getUsers();
	  this.mapid2name();	
  }
  newarticlebut(){
  	console.log("hello~!")
  }
  getArticles(): void{
   this.blogdataService.getArticles().subscribe(articles => this.articles = articles);
  }
  getUsers(): void{
  	this.blogdataService.getUsers().subscribe(users => this.users = users);
  }
  mapid2name(): void{
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
  }
}
