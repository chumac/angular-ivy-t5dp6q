import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrRefereeViewerComponent } from './hr-referee-viewer.component';

describe('HrRefereeViewerComponent', () => {
  let component: HrRefereeViewerComponent;
  let fixture: ComponentFixture<HrRefereeViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrRefereeViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrRefereeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
