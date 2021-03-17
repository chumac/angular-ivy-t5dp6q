import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverIconComponent } from './hover-icon.component';

describe('HoverIconComponent', () => {
  let component: HoverIconComponent;
  let fixture: ComponentFixture<HoverIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HoverIconComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoverIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
