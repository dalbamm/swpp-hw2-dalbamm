import { Component } from '@angular/core';
import { BlogdataService } from './blogdata.service';
import { Router } from '@angular/router';
import { User } from './User'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SWPP HW-2';
  private users: User[]
  private user: User
  private showSignin: boolean
  constructor(
    private blogdataservice : BlogdataService,
    private router: Router
  ){  }
  ngOnInit(){
    this.initUsers()
    console.log(this.showSignin)
  }
  out(){
    console.log("outbutton")
    this.blogdataservice.setLogout()
  }
  initUsers(){
    this.blogdataservice.getUsers().subscribe(a => (this.users= a) )
    
  }
}
