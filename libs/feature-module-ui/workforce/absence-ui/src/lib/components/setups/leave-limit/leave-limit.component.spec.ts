import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveLimitComponent } from './leave-limit.component';

describe('LeaveLimitComponent', () => {
  let component: LeaveLimitComponent;
  let fixture: ComponentFixture<LeaveLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
