import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalViewerComponent } from './approval-viewer.component';

describe('ApprovalViewerComponent', () => {
  let component: ApprovalViewerComponent;
  let fixture: ComponentFixture<ApprovalViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
