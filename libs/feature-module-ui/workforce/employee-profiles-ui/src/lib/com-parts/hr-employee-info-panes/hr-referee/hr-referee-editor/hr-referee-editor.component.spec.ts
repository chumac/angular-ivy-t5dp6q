import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrRefereeEditorComponent } from './hr-referee-editor.component';

describe('HrRefereeEditorComponent', () => {
  let component: HrRefereeEditorComponent;
  let fixture: ComponentFixture<HrRefereeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrRefereeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrRefereeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
