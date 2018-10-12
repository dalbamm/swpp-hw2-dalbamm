import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogdataService } from '../blogdata.service';
import { Article } from '../Article';
import { User } from '../User';
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
  private LOGONUSER : User
  private newCommentContent: string =""
  private numComments : number
  constructor(
		  private route: ActivatedRoute,
		  private router: Router,
      private blogdataService: BlogdataService
		  ) { }

  ngOnInit() {
    if(this.blogdataService.getLoginUser() === null)  this.router.navigateByUrl("/")
    this.LOGONUSER = this.blogdataService.getLoginUser()
  	this.getArticle();
    this.getComments();
    this.numComments = this.blogdataService.getNumComments()
    console.log(this.numComments)
//    this.blogdataService.getNewArticles();
//    this.blogdataService.getNewComments();
  }
  out(){
    console.log("outbutton")
    this.blogdataService.setLogout()
  }
  getArticle(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  /*this.blogdataService.getNewArticles
  of(this.blogdataService.getNewArticles()).subscribe(a =>this.article =  a.find(ele => ele.id === id));*/
  this.blogdataService.getArticle(id).subscribe(elem => this.blogdataService.authorName(this.article = elem)) 

  
  //this.blogdataService.getArticle(id).subscribe(article => this.article = article);
  }
  getComments(): void {
    //const id = +this.route.snapshot.paramMap.get('id');
    /*this.blogdataService.getNewComments().subscribe(a=>this.comments = a.filter(
      comment => comment.article_id === this.article.id ));*/
      //this.comments = this.blogdataService.getNewComments().filter(elem => elem.article_id === this.article.id)/*.subscribe(comments => this.comments = comments.filter(
        //comment => comment.article_id === this.article.id )*/
        this.blogdataService.getComments().subscribe(a=>this.comments =(
          a.filter(elem => elem.article_id === this.article.id 
            && this.blogdataService.authorName(elem)))) 

        }
  createComment(): void{
//    console.log(this.newCommentContent);
    let tmpComment :Comment = new Comment()
    tmpComment.id = this.numComments
    tmpComment.article_id = this.article.id
    tmpComment.author_id = this.article.author_id
    tmpComment.content = this.newCommentContent
    tmpComment.author_name = this.LOGONUSER.name
    
    this.blogdataService.addComment(tmpComment).subscribe(a=>a)
    //this.comments = this.blogdataService.getNewComments()
    this.getComments()
    /*this.blogdataService.getComments().subscribe(a=>this.comments =(
       a.filter(elem => elem.article_id === this.article.id)))
    
    console.log(this.blogdataService.getCommentsId(tmpComment.id))*/
    this.numComments += 1
    this.blogdataService.setNumComments(this.numComments)
    //this.comments = this.blogdataService.getNewComments()
    
  }
  editComment(comment :  Comment): void{
    let tmpComment :Comment = new Comment()
    console.log(comment)
    tmpComment.id = comment.id
    tmpComment.article_id = this.article.id
    tmpComment.author_id = this.article.author_id
    tmpComment.author_name = this.LOGONUSER.name
    let revised = prompt("Edit your comment")
    console.log(revised)
    if(revised === null)  return
    tmpComment.content = revised
    
    this.blogdataService.updateComment(tmpComment).subscribe(a=>a);
    
    this.getComments()
  }
  deleteComment(comment :  Comment): void{
    let tmpComment :Comment = new Comment()
    console.log(comment)
    tmpComment.id = comment.id
    tmpComment.article_id = this.article.id
    tmpComment.author_id = this.article.author_id
    tmpComment.author_name = this.LOGONUSER.name
    //let revised = prompt("Edit your comment")
    //console.log(revised)
    //if(revised === null)  return
    //tmpComment.content = revised
    
    this.blogdataService.deleteComment(tmpComment.id).subscribe(a=>a);
    
    this.getComments()
  }/////******** */
  deleteArticle(comment :  Comment): void{
    let tmpComment :Comment = new Comment()
    console.log(comment)
    tmpComment.id = comment.id
    tmpComment.article_id = this.article.id
    tmpComment.author_id = this.article.author_id
    tmpComment.author_name = this.LOGONUSER.name
    //let revised = prompt("Edit your comment")
    //console.log(revised)
    //if(revised === null)  return
    //tmpComment.content = revised
    
    this.blogdataService.deleteComment(tmpComment.id).subscribe(a=>a);
    
    this.getComments()
  }
}

