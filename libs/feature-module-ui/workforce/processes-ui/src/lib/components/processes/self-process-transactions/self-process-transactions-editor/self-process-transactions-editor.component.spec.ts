import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfProcessTransactionsEditorComponent } from './selfProcessTransactions-editor.component';

describe('SelfProcessTransactionsEditorComponent', () => {
  let component: SelfProcessTransactionsEditorComponent;
  let fixture: ComponentFixture<SelfProcessTransactionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfProcessTransactionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfProcessTransactionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
