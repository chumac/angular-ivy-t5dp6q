import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiJobRolesComponent } from './multi-job-roles.component';

describe('MultiJobRolesComponent', () => {
  let component: MultiJobRolesComponent;
  let fixture: ComponentFixture<MultiJobRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiJobRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiJobRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
