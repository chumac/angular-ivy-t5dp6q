import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursementEditorComponent } from './disbursement-editor.component';

describe('DisbursementEditorComponent', () => {
  let component: DisbursementEditorComponent;
  let fixture: ComponentFixture<DisbursementEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisbursementEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisbursementEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
