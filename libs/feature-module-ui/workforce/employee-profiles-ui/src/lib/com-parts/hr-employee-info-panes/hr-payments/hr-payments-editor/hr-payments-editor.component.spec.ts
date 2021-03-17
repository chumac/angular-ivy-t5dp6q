import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPaymentsEditorComponent } from './hr-payments-editor.component';

describe('HrPaymentsEditorComponent', () => {
  let component: HrPaymentsEditorComponent;
  let fixture: ComponentFixture<HrPaymentsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrPaymentsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPaymentsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
