import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalRefereesViewerComponent } from './personal-referees-viewer.component';

describe('PersonalRefereesViewerComponent', () => {
  let component: PersonalRefereesViewerComponent;
  let fixture: ComponentFixture<PersonalRefereesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalRefereesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalRefereesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
