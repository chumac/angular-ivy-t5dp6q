import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemptsComponent } from './exempts.component';

describe('ExemptsComponent', () => {
  let component: ExemptsComponent;
  let fixture: ComponentFixture<ExemptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExemptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
