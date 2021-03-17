import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionViewerComponent } from './position-viewer.component';

describe('PositionViewerComponent', () => {
  let component: PositionViewerComponent;
  let fixture: ComponentFixture<PositionViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
