import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrSeparationViewerComponent } from './hr-separation-viewer.component';

describe('HrSeparationViewerComponent', () => {
  let component: HrSeparationViewerComponent;
  let fixture: ComponentFixture<HrSeparationViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrSeparationViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrSeparationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
