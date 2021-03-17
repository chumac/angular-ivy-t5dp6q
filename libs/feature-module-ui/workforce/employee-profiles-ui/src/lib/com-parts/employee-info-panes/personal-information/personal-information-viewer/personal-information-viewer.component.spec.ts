import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInformationViewerComponent } from './personal-information-viewer.component';

describe('PersonalInformationViewerComponent', () => {
  let component: PersonalInformationViewerComponent;
  let fixture: ComponentFixture<PersonalInformationViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalInformationViewerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalInformationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
