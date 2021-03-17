import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitResignationComponent } from './submit-resignation.component';

describe('SubmitResignationComponent', () => {
  let component: SubmitResignationComponent;
  let fixture: ComponentFixture<SubmitResignationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitResignationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitResignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
