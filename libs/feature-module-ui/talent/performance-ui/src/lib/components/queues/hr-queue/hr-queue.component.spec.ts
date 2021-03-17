import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrQueueComponent } from './hr-queue.component';

describe('HrQueueComponent', () => {
  let component: HrQueueComponent;
  let fixture: ComponentFixture<HrQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
