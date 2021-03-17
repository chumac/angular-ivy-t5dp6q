import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleViewerComponent } from './people-viewer.component';

describe('PeopleViewerComponent', () => {
  let component: PeopleViewerComponent;
  let fixture: ComponentFixture<PeopleViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
