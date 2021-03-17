import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitNavigationComponent } from './recruit-navigation.component';

describe('RecruitNavigationComponent', () => {
  let component: RecruitNavigationComponent;
  let fixture: ComponentFixture<RecruitNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecruitNavigationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
