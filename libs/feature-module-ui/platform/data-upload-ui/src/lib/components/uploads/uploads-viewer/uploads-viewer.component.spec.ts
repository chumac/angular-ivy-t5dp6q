import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsViewerComponent } from './uploads-viewer.component';

describe('UploadsViewerComponent', () => {
  let component: UploadsViewerComponent;
  let fixture: ComponentFixture<UploadsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
