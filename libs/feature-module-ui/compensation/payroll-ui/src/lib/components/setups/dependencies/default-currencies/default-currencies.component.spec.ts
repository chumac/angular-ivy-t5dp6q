import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCurrenciesComponent } from './default-currencies.component';

describe('DefaultCurrenciesComponent', () => {
  let component: DefaultCurrenciesComponent;
  let fixture: ComponentFixture<DefaultCurrenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultCurrenciesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
