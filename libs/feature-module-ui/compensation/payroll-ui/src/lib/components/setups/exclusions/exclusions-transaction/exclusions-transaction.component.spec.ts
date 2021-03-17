import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusionsTransactionComponent } from './exclusions-transaction.component';

describe('ExclusionsTransactionComponent', () => {
  let component: ExclusionsTransactionComponent;
  let fixture: ComponentFixture<ExclusionsTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExclusionsTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusionsTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
