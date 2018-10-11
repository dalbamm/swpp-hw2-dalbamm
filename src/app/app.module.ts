import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Imports for loading & configuring the in-memory web api 
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { SigninComponent } from './signin/signin.component';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { ArticleDetailComponentComponent } from './article-detail-component/article-detail-component.component';
import { ArticleEditPageComponent } from './article-edit-page/article-edit-page.component';
import { ArticleCreatePageComponent } from './article-create-page/article-create-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    ArticlesPageComponent,
    ArticleDetailComponentComponent,
    ArticleEditPageComponent,
    ArticleCreatePageComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
