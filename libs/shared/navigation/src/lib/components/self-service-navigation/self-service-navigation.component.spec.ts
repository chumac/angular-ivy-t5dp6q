import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfServiceNavigationComponent } from './self-service-navigation.component';

describe('SelfServiceNavigationComponent', () => {
  let component: SelfServiceNavigationComponent;
  let fixture: ComponentFixture<SelfServiceNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelfServiceNavigationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfServiceNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
