import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayDeskComponent } from './pay-desk.component';

describe('PayDeskComponent', () => {
  let component: PayDeskComponent;
  let fixture: ComponentFixture<PayDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
