import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorsComponent } from './guarantors.component';

describe('GuarantorsComponent', () => {
  let component: GuarantorsComponent;
  let fixture: ComponentFixture<GuarantorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GuarantorsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuarantorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
