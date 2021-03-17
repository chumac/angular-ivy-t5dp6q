import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInfoRootPaneComponent } from './employee-info-root-pane.component';

describe('EmployeeInfoRootPaneComponent', () => {
  let component: EmployeeInfoRootPaneComponent;
  let fixture: ComponentFixture<EmployeeInfoRootPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeInfoRootPaneComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeInfoRootPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
