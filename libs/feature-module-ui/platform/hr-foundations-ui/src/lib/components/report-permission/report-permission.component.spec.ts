import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPermissionComponent } from './report-permission.component';

describe('ReportPermissionComponent', () => {
  let component: ReportPermissionComponent;
  let fixture: ComponentFixture<ReportPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
