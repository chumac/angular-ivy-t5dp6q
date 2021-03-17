import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReliefComponent } from './add-relief.component';

describe('AddReliefComponent', () => {
  let component: AddReliefComponent;
  let fixture: ComponentFixture<AddReliefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReliefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReliefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
