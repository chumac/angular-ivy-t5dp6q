import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineManagersViewerComponent } from './lineManagers-viewer.component';

describe('LineManagersViewerComponent', () => {
  let component: LineManagersViewerComponent;
  let fixture: ComponentFixture<LineManagersViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineManagersViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineManagersViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
