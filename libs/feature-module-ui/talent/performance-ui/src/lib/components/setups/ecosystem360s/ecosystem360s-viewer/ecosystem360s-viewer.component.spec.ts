import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ecosystem360sViewerComponent } from './ecosystem360s-viewer.component';

describe('Ecosystem360sViewerComponent', () => {
  let component: Ecosystem360sViewerComponent;
  let fixture: ComponentFixture<Ecosystem360sViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ecosystem360sViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ecosystem360sViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
