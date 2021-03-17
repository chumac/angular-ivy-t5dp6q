import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanOptionsViewerComponent } from './planOptions-viewer.component';

describe('PlanOptionsViewerComponent', () => {
  let component: PlanOptionsViewerComponent;
  let fixture: ComponentFixture<PlanOptionsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanOptionsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanOptionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
