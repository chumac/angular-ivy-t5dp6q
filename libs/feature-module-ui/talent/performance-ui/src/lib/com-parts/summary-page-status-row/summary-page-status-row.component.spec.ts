import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPageStatusRowComponent } from './summary-page-status-row.component';

describe('SummaryPageStatusRowComponent', () => {
  let component: SummaryPageStatusRowComponent;
  let fixture: ComponentFixture<SummaryPageStatusRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryPageStatusRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryPageStatusRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
