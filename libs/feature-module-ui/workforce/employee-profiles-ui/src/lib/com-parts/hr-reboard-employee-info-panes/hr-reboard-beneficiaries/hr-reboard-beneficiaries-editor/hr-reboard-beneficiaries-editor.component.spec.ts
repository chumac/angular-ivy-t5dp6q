import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariesEditorComponent } from './beneficiaries-editor.component';

describe('BeneficiariesEditorComponent', () => {
  let component: BeneficiariesEditorComponent;
  let fixture: ComponentFixture<BeneficiariesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiariesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiariesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
