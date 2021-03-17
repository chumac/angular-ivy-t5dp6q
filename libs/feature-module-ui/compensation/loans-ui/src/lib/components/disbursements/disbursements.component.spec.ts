import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursementsComponent } from './disbursements.component';

describe('DisbursementsComponent', () => {
  let component: DisbursementsComponent;
  let fixture: ComponentFixture<DisbursementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisbursementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisbursementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
