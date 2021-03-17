import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveEditorComponent } from './approve-editor.component';

describe('ApproveEditorComponent', () => {
  let component: ApproveEditorComponent;
  let fixture: ComponentFixture<ApproveEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
