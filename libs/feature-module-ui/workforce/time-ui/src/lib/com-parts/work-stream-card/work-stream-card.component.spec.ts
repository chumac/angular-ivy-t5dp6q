import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkStreamCardComponent } from './work-stream-card.component';

describe('WorkStreamCardComponent', () => {
  let component: WorkStreamCardComponent;
  let fixture: ComponentFixture<WorkStreamCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkStreamCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkStreamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
