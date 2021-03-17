import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalPathViewerComponent } from './approval-path-viewer.component';

describe('ApprovalPathViewerComponent', () => {
  let component: ApprovalPathViewerComponent;
  let fixture: ComponentFixture<ApprovalPathViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalPathViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalPathViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
