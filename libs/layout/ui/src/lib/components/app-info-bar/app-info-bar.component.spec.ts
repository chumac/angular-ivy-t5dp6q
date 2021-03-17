import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInfoBarComponent } from './app-info-bar.component';

describe('AppInfoBarComponent', () => {
  let component: AppInfoBarComponent;
  let fixture: ComponentFixture<AppInfoBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppInfoBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInfoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
