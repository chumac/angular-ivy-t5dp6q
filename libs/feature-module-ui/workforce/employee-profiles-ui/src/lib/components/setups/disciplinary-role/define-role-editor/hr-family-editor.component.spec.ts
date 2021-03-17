import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrFamilyEditorComponent } from './hr-family-editor.component';

describe('HrFamilyEditorComponent', () => {
  let component: HrFamilyEditorComponent;
  let fixture: ComponentFixture<HrFamilyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrFamilyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrFamilyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
