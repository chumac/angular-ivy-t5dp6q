import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectivesViewerComponent } from './objectives-viewer.component';

describe('ObjectivesViewerComponent', () => {
  let component: ObjectivesViewerComponent;
  let fixture: ComponentFixture<ObjectivesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectivesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectivesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
