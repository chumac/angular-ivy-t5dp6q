import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencyPageComponent } from './competency-page.component';

describe('CompetencyPageComponent', () => {
  let component: CompetencyPageComponent;
  let fixture: ComponentFixture<CompetencyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetencyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetencyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
