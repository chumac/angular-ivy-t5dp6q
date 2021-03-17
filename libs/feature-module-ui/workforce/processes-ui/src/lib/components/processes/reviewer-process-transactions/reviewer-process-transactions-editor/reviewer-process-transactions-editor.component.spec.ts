import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerProcessTransactionsEditorComponent } from './reviewerProcessTransactions-editor.component';

describe('ReviewerProcessTransactionsEditorComponent', () => {
  let component: ReviewerProcessTransactionsEditorComponent;
  let fixture: ComponentFixture<ReviewerProcessTransactionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewerProcessTransactionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerProcessTransactionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
