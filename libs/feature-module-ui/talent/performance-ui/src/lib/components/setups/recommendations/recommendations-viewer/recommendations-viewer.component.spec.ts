import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsViewerComponent } from './recommendations-viewer.component';

describe('RecommendationsViewerComponent', () => {
  let component: RecommendationsViewerComponent;
  let fixture: ComponentFixture<RecommendationsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendationsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
