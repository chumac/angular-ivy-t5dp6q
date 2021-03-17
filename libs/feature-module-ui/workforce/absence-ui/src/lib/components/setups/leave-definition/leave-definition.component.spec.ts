import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDefinitionComponent } from './leave-definition.component';

describe('LeaveDefinitionComponent', () => {
  let component: LeaveDefinitionComponent;
  let fixture: ComponentFixture<LeaveDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
