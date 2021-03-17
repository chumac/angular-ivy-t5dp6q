import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageObjectivesComponent } from './manage-objectives.component';

describe('ManageObjectivesComponent', () => {
  let component: ManageObjectivesComponent;
  let fixture: ComponentFixture<ManageObjectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageObjectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
