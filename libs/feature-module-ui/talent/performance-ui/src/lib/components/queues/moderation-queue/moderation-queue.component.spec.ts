import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerationQueueComponent } from './moderation-queue.component';

describe('ModerationQueueComponent', () => {
  let component: ModerationQueueComponent;
  let fixture: ComponentFixture<ModerationQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModerationQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModerationQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
