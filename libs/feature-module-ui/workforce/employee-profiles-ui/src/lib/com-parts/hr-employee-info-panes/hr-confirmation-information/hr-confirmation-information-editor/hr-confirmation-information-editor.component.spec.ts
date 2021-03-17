import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrConfirmationInformationEditorComponent } from './hr-confirmation-information-editor.component';

describe('HrConfirmationInformationEditorComponent', () => {
  let component: HrConfirmationInformationEditorComponent;
  let fixture: ComponentFixture<HrConfirmationInformationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrConfirmationInformationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrConfirmationInformationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
