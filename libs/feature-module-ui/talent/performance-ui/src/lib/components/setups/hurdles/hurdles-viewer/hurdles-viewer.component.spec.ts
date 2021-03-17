import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HurdlesViewerComponent } from './hurdles-viewer.component';

describe('HurdlesViewerComponent', () => {
  let component: HurdlesViewerComponent;
  let fixture: ComponentFixture<HurdlesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HurdlesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HurdlesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
