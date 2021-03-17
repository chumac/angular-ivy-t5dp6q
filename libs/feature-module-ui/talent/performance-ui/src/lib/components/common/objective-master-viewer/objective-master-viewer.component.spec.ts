import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveMasterViewerComponent } from './objective-master-viewer.component';

describe('ObjectiveMasterViewerComponent', () => {
  let component: ObjectiveMasterViewerComponent;
  let fixture: ComponentFixture<ObjectiveMasterViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveMasterViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveMasterViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
