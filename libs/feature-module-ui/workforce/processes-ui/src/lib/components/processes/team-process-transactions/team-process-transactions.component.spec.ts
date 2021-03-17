import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamProcessTransactionsComponent } from './teamProcessTransactions.component';

describe('TeamProcessTransactionsComponent', () => {
  let component: TeamProcessTransactionsComponent;
  let fixture: ComponentFixture<TeamProcessTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamProcessTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamProcessTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
