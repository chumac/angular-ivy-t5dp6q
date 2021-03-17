import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmManageObjectivesComponent } from './lm-manage-objectives.component';

describe('LmManageObjectivesComponent', () => {
  let component: LmManageObjectivesComponent;
  let fixture: ComponentFixture<LmManageObjectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmManageObjectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmManageObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
