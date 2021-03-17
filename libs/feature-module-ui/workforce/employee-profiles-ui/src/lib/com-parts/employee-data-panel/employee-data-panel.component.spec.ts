import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDataPanelComponent } from './employee-data-panel.component';

describe('EmployeeDataPanelComponent', () => {
  let component: EmployeeDataPanelComponent;
  let fixture: ComponentFixture<EmployeeDataPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeDataPanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDataPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
