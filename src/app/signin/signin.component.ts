import { Component, OnInit } from '@angular/core';
import { Article } from'../Article'
  import { BlogdataService } from '../blogdata.service';
import { User } from '../User';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  private user : User
  private users : User[]
  constructor(  private blogdataservice : BlogdataService
    ){}
  ngOnInit(  ) {
    this.initUsers();
  }
  check(){
   	var email = (<HTMLInputElement>document.getElementById("email-input")).value;
  	var pawd = (<HTMLInputElement>document.getElementById("pw-input")).value;
    //console.log(email);
	  //console.log(pawd);
    var flag = email==="swpp@snu.ac.kr" && pawd ==="iluvswpp" ? true : false;
    //this.blogdataservice.getUsers().subscribe(a => (this.user = a.find(b => b.email === email && b.password === pawd )))
    this.user = this.users.find(a => a.email === email && a.password === pawd )
    
    
    if(this.user === undefined ) alert("Email or password is wrong")
    else this.blogdataservice.setLoginUser(this.user);
    console.log(this.user)
    console.log(this.users)

  }
  initUsers(){
    this.blogdataservice.getUsers().subscribe(a => (this.users= a) )
  }
}
