import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanOptionsComponent } from './planOptions.component';

describe('PlanOptionsComponent', () => {
  let component: PlanOptionsComponent;
  let fixture: ComponentFixture<PlanOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
