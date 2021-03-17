import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadObjectivesComponent } from './load-objectives.component';

describe('LoadObjectivesComponent', () => {
  let component: LoadObjectivesComponent;
  let fixture: ComponentFixture<LoadObjectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadObjectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
