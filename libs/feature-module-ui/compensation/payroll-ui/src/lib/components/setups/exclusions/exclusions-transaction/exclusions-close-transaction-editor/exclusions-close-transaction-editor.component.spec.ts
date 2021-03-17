import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusionsCloseTransactionEditorComponent } from './exclusions-close-transaction-editor.component';

describe('ExclusionsCloseTransactionEditorComponent', () => {
  let component: ExclusionsCloseTransactionEditorComponent;
  let fixture: ComponentFixture<ExclusionsCloseTransactionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExclusionsCloseTransactionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusionsCloseTransactionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
