import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrBeneficiariesEditorComponent } from './hr-beneficiaries-editor.component';

describe('HrBeneficiariesEditorComponent', () => {
  let component: HrBeneficiariesEditorComponent;
  let fixture: ComponentFixture<HrBeneficiariesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrBeneficiariesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrBeneficiariesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
