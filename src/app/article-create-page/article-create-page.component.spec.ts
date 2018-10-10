import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCreatePageComponent } from './article-create-page.component';

describe('ArticleCreatePageComponent', () => {
  let component: ArticleCreatePageComponent;
  let fixture: ComponentFixture<ArticleCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
