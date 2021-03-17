import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemProcessComponent } from './system-process.component';

describe('SystemProcessComponent', () => {
  let component: SystemProcessComponent;
  let fixture: ComponentFixture<SystemProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
