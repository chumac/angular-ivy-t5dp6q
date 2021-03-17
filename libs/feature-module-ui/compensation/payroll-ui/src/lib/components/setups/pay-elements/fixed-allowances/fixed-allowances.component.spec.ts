import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAllowancesComponent } from './fixed-allowances.component';

describe('FixedAllowancesComponent', () => {
  let component: FixedAllowancesComponent;
  let fixture: ComponentFixture<FixedAllowancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAllowancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAllowancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
