import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiEmployeeLoadObjectivesViewerComponent } from './multi-employee-load-objectives-viewer.component';

describe('MultiEmployeeLoadObjectivesViewerComponent', () => {
  let component: MultiEmployeeLoadObjectivesViewerComponent;
  let fixture: ComponentFixture<MultiEmployeeLoadObjectivesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiEmployeeLoadObjectivesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiEmployeeLoadObjectivesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
