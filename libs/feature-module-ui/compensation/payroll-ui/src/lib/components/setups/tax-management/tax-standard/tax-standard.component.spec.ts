import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxStandardComponent } from './tax-standard.component';

describe('TaxStandardComponent', () => {
  let component: TaxStandardComponent;
  let fixture: ComponentFixture<TaxStandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxStandardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
