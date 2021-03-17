import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrIdentificationViewerComponent } from './hr-identification-viewer.component';

describe('HrIdentificationViewerComponent', () => {
  let component: HrIdentificationViewerComponent;
  let fixture: ComponentFixture<HrIdentificationViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrIdentificationViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrIdentificationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
