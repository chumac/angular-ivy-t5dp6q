import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayGroupsComponent } from './pay-groups.component';

describe('PayGroupsComponent', () => {
  let component: PayGroupsComponent;
  let fixture: ComponentFixture<PayGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
