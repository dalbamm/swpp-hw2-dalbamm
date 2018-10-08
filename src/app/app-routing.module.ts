import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [ 
{ path: '', redirectTo: '/sign_in', pathMatch:'full' },
{ path:'sign_in', component: SigninComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  //declarations: []
})
export class AppRoutingModule { }
