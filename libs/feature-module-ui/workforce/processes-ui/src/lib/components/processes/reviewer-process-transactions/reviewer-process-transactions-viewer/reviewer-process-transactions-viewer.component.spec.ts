import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerProcessTransactionsViewerComponent } from './reviewerProcessTransactions-viewer.component';

describe('ReviewerProcessTransactionsViewerComponent', () => {
  let component: ReviewerProcessTransactionsViewerComponent;
  let fixture: ComponentFixture<ReviewerProcessTransactionsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewerProcessTransactionsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerProcessTransactionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
