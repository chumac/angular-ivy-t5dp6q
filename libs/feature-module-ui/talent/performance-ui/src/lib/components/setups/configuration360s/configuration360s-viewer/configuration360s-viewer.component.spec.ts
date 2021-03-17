import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Configuration360sViewerComponent } from './configuration360s-viewer.component';

describe('Configuration360sViewerComponent', () => {
  let component: Configuration360sViewerComponent;
  let fixture: ComponentFixture<Configuration360sViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Configuration360sViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Configuration360sViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
