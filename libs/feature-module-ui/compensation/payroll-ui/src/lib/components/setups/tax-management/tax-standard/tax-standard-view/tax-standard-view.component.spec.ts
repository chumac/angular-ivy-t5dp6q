import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxStandardViewComponent } from './tax-standard-view.component';

describe('TaxStandardViewComponent', () => {
  let component: TaxStandardViewComponent;
  let fixture: ComponentFixture<TaxStandardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxStandardViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxStandardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
