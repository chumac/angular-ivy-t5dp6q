import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalAwardsComponent } from './professional-awards.component';

describe('ProfessionalAwardsComponent', () => {
  let component: ProfessionalAwardsComponent;
  let fixture: ComponentFixture<ProfessionalAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
