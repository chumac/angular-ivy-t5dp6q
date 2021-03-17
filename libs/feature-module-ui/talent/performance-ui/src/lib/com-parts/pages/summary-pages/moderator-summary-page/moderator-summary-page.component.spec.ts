import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorSummaryPageComponent } from './moderator-summary-page.component';

describe('ModeratorSummaryPageComponent', () => {
  let component: ModeratorSummaryPageComponent;
  let fixture: ComponentFixture<ModeratorSummaryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorSummaryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorSummaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
