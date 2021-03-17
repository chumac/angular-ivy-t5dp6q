import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionConfigureComponent } from './transaction-configure.component';

describe('TransactionConfigureComponent', () => {
  let component: TransactionConfigureComponent;
  let fixture: ComponentFixture<TransactionConfigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionConfigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
