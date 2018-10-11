import { Component } from '@angular/core';
import { BlogdataService } from './blogdata.service';
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
  constructor(
    private blogdataservice : BlogdataService
  ){  }
  ngOnInit(){
    this.initUsers()
  }
  out(){
    console.log("outbutton")
    this.blogdataservice.setLogout()
  }
  initUsers(){
    this.blogdataservice.getUsers().subscribe(a => (this.users= a) )
    
  }
}
