import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WipNavigationComponent } from './wip-navigation.component';

describe('WipNavigationComponent', () => {
  let component: WipNavigationComponent;
  let fixture: ComponentFixture<WipNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WipNavigationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WipNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
