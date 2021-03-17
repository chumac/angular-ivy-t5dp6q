import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDefinitionViewerComponent } from './leave-definition-viewer.component';

describe('LeaveDefinitionViewerComponent', () => {
  let component: LeaveDefinitionViewerComponent;
  let fixture: ComponentFixture<LeaveDefinitionViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveDefinitionViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveDefinitionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
