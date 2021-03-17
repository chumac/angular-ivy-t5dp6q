import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisioningEmployeeEditorComponent } from './provisioning-employee-editor.component';

describe('ProvisioningEmployeeEditorComponent', () => {
  let component: ProvisioningEmployeeEditorComponent;
  let fixture: ComponentFixture<ProvisioningEmployeeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisioningEmployeeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisioningEmployeeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
