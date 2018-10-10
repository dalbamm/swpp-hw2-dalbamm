import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { ArticleDetailComponentComponent } from './article-detail-component/article-detail-component.component';
import { ArticleEditPageComponent } from './article-edit-page/article-edit-page.component';
import { ArticleCreatePageComponent } from './article-create-page/article-create-page.component';

const routes: Routes = [ 
{ path: '', redirectTo: '/sign_in', pathMatch:'full' },
{ path:'sign_in', component: SigninComponent },
{ path:'articles', component: ArticlesPageComponent },
{ path: 'articles/create', component: ArticleCreatePageComponent },
{ path: 'articles/:id', component: ArticleDetailComponentComponent }
{ path: 'articles/:id/edit', component: ArticleEditPageComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
  //declarations: []
})
export class AppRoutingModule { }
