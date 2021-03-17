import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemptsViewerComponent } from './exempts-viewer.component';

describe('ExemptsViewerComponent', () => {
  let component: ExemptsViewerComponent;
  let fixture: ComponentFixture<ExemptsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExemptsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemptsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
