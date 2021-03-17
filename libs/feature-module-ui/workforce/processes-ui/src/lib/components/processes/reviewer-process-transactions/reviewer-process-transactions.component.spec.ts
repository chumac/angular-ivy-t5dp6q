import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerProcessTransactionsComponent } from './reviewerProcessTransactions.component';

describe('ReviewerProcessTransactionsComponent', () => {
  let component: ReviewerProcessTransactionsComponent;
  let fixture: ComponentFixture<ReviewerProcessTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewerProcessTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerProcessTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
