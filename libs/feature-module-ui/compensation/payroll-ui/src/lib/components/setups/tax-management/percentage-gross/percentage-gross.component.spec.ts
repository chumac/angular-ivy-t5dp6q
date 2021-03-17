import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageGrossComponent } from './percentage-gross.component';

describe('PercentageGrossComponent', () => {
  let component: PercentageGrossComponent;
  let fixture: ComponentFixture<PercentageGrossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentageGrossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageGrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
