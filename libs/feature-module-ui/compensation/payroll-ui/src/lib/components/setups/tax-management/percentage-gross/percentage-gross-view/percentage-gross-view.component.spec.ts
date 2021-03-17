import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageGrossViewComponent } from './percentage-gross-view.component';

describe('PercentageGrossViewComponent', () => {
  let component: PercentageGrossViewComponent;
  let fixture: ComponentFixture<PercentageGrossViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentageGrossViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageGrossViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
