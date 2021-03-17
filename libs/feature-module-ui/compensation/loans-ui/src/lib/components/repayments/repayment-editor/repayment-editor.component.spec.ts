import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaymentEditorComponent } from './repayment-editor.component';

describe('RepaymentEditorComponent', () => {
  let component: RepaymentEditorComponent;
  let fixture: ComponentFixture<RepaymentEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepaymentEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepaymentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
