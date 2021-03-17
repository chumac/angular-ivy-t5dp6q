import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDataViewerComponent } from './employee-data-viewer.component';

describe('EmployeeDataViewerComponent', () => {
  let component: EmployeeDataViewerComponent;
  let fixture: ComponentFixture<EmployeeDataViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDataViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDataViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
