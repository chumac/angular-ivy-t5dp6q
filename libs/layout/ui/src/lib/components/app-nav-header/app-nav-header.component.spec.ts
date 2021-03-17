import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavHeaderComponent } from './app-nav-header.component';

describe('AppNavHeaderComponent', () => {
  let component: AppNavHeaderComponent;
  let fixture: ComponentFixture<AppNavHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppNavHeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
