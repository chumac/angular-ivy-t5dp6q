import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionConfigureEditorComponent } from './transaction-configure-editor.component';

describe('TransactionConfigureEditorComponent', () => {
  let component: TransactionConfigureEditorComponent;
  let fixture: ComponentFixture<TransactionConfigureEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionConfigureEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionConfigureEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
