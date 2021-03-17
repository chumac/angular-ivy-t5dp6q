import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlTimelineComponent } from './comment-box.component';

describe('SlTimelineComponent', () => {
  let component: SlTimelineComponent;
  let fixture: ComponentFixture<SlTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
