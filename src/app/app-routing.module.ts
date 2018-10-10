import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { ArticleDetailComponentComponent } from './article-detail-component/article-detail-component.component';

const routes: Routes = [ 
{ path: '', redirectTo: '/sign_in', pathMatch:'full' },
{ path:'sign_in', component: SigninComponent },
{ path:'articles', component: ArticlesPageComponent },
{ path: 'articles/create', component: ArticleDetailComponentComponent },
{ path: 'articles/:id', component: ArticleDetailComponentComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  //declarations: []
})
export class AppRoutingModule { }
