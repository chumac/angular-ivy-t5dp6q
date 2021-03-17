import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrFamilyViewerComponent } from './hr-family-viewer.component';

describe('HrFamilyViewerComponent', () => {
  let component: HrFamilyViewerComponent;
  let fixture: ComponentFixture<HrFamilyViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrFamilyViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrFamilyViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
