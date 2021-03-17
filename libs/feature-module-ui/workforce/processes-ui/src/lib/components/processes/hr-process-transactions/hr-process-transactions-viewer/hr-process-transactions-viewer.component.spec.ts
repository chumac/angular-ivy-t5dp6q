import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrProcessTransactionsViewerComponent } from './hrProcessTransactions-viewer.component';

describe('HrProcessTransactionsViewerComponent', () => {
  let component: HrProcessTransactionsViewerComponent;
  let fixture: ComponentFixture<HrProcessTransactionsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrProcessTransactionsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrProcessTransactionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
