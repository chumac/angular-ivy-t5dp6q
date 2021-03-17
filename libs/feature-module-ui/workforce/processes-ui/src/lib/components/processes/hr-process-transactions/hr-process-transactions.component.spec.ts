import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrProcessTransactionsComponent } from './hrProcessTransactions.component';

describe('HrProcessTransactionsComponent', () => {
  let component: HrProcessTransactionsComponent;
  let fixture: ComponentFixture<HrProcessTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrProcessTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrProcessTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
