import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparationReasonComponent } from './separation-reason.component';

describe('SeparationReasonComponent', () => {
  let component: SeparationReasonComponent;
  let fixture: ComponentFixture<SeparationReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeparationReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparationReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
