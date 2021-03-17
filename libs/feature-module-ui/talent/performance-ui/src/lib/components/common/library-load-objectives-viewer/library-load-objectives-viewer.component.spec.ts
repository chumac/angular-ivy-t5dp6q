import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryLoadObjectivesViewerComponent } from './library-load-objectives-viewer.component';

describe('LibraryLoadObjectivesViewerComponent', () => {
  let component: LibraryLoadObjectivesViewerComponent;
  let fixture: ComponentFixture<LibraryLoadObjectivesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryLoadObjectivesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryLoadObjectivesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
