import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveViewerComponent } from './objective-viewer.component';

describe('ObjectiveViewerComponent', () => {
  let component: ObjectiveViewerComponent;
  let fixture: ComponentFixture<ObjectiveViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
