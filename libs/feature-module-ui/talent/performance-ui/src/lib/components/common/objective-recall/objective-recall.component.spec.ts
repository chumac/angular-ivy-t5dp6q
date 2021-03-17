import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveRecallComponent } from './objective-recall.component';

describe('ObjectiveRecallComponent', () => {
  let component: ObjectiveRecallComponent;
  let fixture: ComponentFixture<ObjectiveRecallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveRecallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveRecallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
