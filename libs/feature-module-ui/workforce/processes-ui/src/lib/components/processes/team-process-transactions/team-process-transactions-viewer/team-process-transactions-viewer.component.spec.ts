import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamProcessTransactionsViewerComponent } from './teamProcessTransactions-viewer.component';

describe('TeamProcessTransactionsViewerComponent', () => {
  let component: TeamProcessTransactionsViewerComponent;
  let fixture: ComponentFixture<TeamProcessTransactionsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamProcessTransactionsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamProcessTransactionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
