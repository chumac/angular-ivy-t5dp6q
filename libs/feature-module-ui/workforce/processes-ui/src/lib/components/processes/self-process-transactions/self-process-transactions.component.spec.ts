import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfProcessTransactionsComponent } from './selfProcessTransactions.component';

describe('SelfProcessTransactionsComponent', () => {
  let component: SelfProcessTransactionsComponent;
  let fixture: ComponentFixture<SelfProcessTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfProcessTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfProcessTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
