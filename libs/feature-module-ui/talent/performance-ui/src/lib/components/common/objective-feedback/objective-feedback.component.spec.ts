import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveFeedbackComponent } from './objective-feedback.component';

describe('ObjectiveFeedbackComponent', () => {
  let component: ObjectiveFeedbackComponent;
  let fixture: ComponentFixture<ObjectiveFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
