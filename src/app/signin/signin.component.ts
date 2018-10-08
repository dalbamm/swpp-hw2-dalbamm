import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
	constructor(  ){}
  ngOnInit( ) {}
  check(){
 	var email = (<HTMLInputElement>document.getElementById("email-input")).value;
 	var pawd = (<HTMLInputElement>document.getElementById("pw-input")).value;
	console.log(email);
	console.log(pawd);
	email==="swpp@snu.ac.kr" && pawd ==="iluvswpp" ? alert("success") : alert("Email or password is wrong")
  }
}
