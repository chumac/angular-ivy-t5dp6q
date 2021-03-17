import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrProcessTransactionsEditorComponent } from './hrProcessTransactions-editor.component';

describe('HrProcessTransactionsEditorComponent', () => {
  let component: HrProcessTransactionsEditorComponent;
  let fixture: ComponentFixture<HrProcessTransactionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrProcessTransactionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrProcessTransactionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
