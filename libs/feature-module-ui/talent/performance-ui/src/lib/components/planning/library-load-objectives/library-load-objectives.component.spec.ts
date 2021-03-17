import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryLoadObjectivesComponent } from './library-load-objectives.component';

describe('LibraryLoadObjectivesComponent', () => {
  let component: LibraryLoadObjectivesComponent;
  let fixture: ComponentFixture<LibraryLoadObjectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryLoadObjectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryLoadObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
