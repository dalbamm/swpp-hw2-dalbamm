import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailComponentComponent } from './article-detail-component.component';

describe('ArticleDetailComponentComponent', () => {
  let component: ArticleDetailComponentComponent;
  let fixture: ComponentFixture<ArticleDetailComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleDetailComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
