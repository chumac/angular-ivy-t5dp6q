import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrCustomDataFormsViewerComponent } from './hrCustomDataForms-viewer.component';

describe('HrCustomDataFormsViewerComponent', () => {
  let component: HrCustomDataFormsViewerComponent;
  let fixture: ComponentFixture<HrCustomDataFormsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrCustomDataFormsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrCustomDataFormsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
