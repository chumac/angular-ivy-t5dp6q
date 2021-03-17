import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressTransactionEditorComponent } from './progress-transaction-editor.component';

describe('ProgressTransactionEditorComponent', () => {
  let component: ProgressTransactionEditorComponent;
  let fixture: ComponentFixture<ProgressTransactionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressTransactionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressTransactionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
