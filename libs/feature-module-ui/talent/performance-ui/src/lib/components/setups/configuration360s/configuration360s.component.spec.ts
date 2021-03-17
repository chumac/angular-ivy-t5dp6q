import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Configuration360sComponent } from './configuration360s.component';

describe('Configuration360sComponent', () => {
  let component: Configuration360sComponent;
  let fixture: ComponentFixture<Configuration360sComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Configuration360sComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Configuration360sComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
