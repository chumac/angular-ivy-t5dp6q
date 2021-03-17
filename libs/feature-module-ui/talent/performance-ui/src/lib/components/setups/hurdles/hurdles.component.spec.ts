import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HurdlesComponent } from './hurdles.component';

describe('HurdlesComponent', () => {
  let component: HurdlesComponent;
  let fixture: ComponentFixture<HurdlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HurdlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HurdlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
