import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrSeparationEditorComponent } from './hr-separation-editor.component';

describe('HrSeparationEditorComponent', () => {
  let component: HrSeparationEditorComponent;
  let fixture: ComponentFixture<HrSeparationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrSeparationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrSeparationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
