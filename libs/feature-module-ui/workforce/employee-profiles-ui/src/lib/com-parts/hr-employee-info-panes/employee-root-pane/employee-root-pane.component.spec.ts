import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRootPaneComponent } from './employee-root-pane.component';

describe('EmployeeRootPaneComponent', () => {
  let component: EmployeeRootPaneComponent;
  let fixture: ComponentFixture<EmployeeRootPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRootPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRootPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
