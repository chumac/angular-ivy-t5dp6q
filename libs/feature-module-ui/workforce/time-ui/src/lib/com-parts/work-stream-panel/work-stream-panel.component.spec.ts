import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkStreamPanelComponent } from './work-stream-panel.component';

describe('WorkStreamPanelComponent', () => {
  let component: WorkStreamPanelComponent;
  let fixture: ComponentFixture<WorkStreamPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkStreamPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkStreamPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
