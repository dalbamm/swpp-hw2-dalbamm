import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleEditPageComponent } from './article-edit-page.component';

describe('ArticleEditPageComponent', () => {
  let component: ArticleEditPageComponent;
  let fixture: ComponentFixture<ArticleEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
