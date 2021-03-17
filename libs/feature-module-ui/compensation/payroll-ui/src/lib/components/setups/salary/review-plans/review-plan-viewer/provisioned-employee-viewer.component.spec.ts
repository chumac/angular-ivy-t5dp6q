import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionedEmployeeViewerComponent } from './provisioned-employee-viewer.component';

describe('ProvisionedEmployeeViewerComponent', () => {
  let component: ProvisionedEmployeeViewerComponent;
  let fixture: ComponentFixture<ProvisionedEmployeeViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionedEmployeeViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionedEmployeeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
