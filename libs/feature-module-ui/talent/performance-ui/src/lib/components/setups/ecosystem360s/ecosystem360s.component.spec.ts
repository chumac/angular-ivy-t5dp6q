import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ecosystem360sComponent } from './ecosystem360s.component';

describe('Ecosystem360sComponent', () => {
  let component: Ecosystem360sComponent;
  let fixture: ComponentFixture<Ecosystem360sComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ecosystem360sComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ecosystem360sComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
