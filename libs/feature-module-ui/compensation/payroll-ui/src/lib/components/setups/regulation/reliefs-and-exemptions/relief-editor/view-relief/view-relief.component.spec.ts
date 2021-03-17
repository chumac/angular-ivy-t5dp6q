import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReliefComponent } from './view-relief.component';

describe('ViewReliefComponent', () => {
  let component: ViewReliefComponent;
  let fixture: ComponentFixture<ViewReliefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReliefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReliefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
