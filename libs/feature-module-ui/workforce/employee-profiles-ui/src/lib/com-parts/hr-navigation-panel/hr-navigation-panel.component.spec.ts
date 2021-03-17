import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrNavigationPanelComponent } from './hr-navigation-panel.component';

describe('HrNavigationPanelComponent', () => {
  let component: HrNavigationPanelComponent;
  let fixture: ComponentFixture<HrNavigationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrNavigationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrNavigationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
