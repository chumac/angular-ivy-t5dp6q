import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPermissionEditorComponent } from './report-permission-editor.component';

describe('ReportPermissionEditorComponent', () => {
  let component: ReportPermissionEditorComponent;
  let fixture: ComponentFixture<ReportPermissionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPermissionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPermissionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
