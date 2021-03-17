import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEmployeeLoadObjectivesViewerComponent } from './single-employee-load-objectives-viewer.component';

describe('SingleEmployeeLoadObjectivesViewerComponent', () => {
  let component: SingleEmployeeLoadObjectivesViewerComponent;
  let fixture: ComponentFixture<SingleEmployeeLoadObjectivesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleEmployeeLoadObjectivesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEmployeeLoadObjectivesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
