import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDependantsViewerComponent } from './hr-dependants-viewer.component';

describe('HrDependantsViewerComponent', () => {
  let component: HrDependantsViewerComponent;
  let fixture: ComponentFixture<HrDependantsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrDependantsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDependantsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
