import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfProcessTransactionsViewerComponent } from './selfProcessTransactions-viewer.component';

describe('SelfProcessTransactionsViewerComponent', () => {
  let component: SelfProcessTransactionsViewerComponent;
  let fixture: ComponentFixture<SelfProcessTransactionsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfProcessTransactionsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfProcessTransactionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
