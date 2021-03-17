import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrContactViewerComponent } from './hr-contact-viewer.component';

describe('HrContactViewerComponent', () => {
  let component: HrContactViewerComponent;
  let fixture: ComponentFixture<HrContactViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrContactViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrContactViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
