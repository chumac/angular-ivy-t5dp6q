import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavHeaderNineboxComponent } from './app-nav-header-ninebox.component';

describe('AppNavHeaderNineboxComponent', () => {
  let component: AppNavHeaderNineboxComponent;
  let fixture: ComponentFixture<AppNavHeaderNineboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppNavHeaderNineboxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavHeaderNineboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
