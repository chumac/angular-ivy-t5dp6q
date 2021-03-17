import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPerformanceHistoryEditorComponent } from './hr-performance-history-editor.component';

describe('HrPerformanceHistoryEditorComponent', () => {
  let component: HrPerformanceHistoryEditorComponent;
  let fixture: ComponentFixture<HrPerformanceHistoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrPerformanceHistoryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPerformanceHistoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
