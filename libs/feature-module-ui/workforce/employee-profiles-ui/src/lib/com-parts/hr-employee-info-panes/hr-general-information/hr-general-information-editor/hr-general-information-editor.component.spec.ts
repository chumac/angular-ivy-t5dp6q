import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrGeneralInformationEditorComponent } from './hr-general-information-editor.component';

describe('HrGeneralInformationEditorComponent', () => {
  let component: HrGeneralInformationEditorComponent;
  let fixture: ComponentFixture<HrGeneralInformationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrGeneralInformationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrGeneralInformationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
