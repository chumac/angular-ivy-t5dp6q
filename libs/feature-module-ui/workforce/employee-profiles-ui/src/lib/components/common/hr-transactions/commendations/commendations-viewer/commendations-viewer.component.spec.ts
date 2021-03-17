import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommendationsViewerComponent } from './commendations-viewer.component';

describe('CommendationsViewerComponent', () => {
  let component: CommendationsViewerComponent;
  let fixture: ComponentFixture<CommendationsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommendationsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommendationsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
