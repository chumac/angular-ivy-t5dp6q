import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecallTimeSheetComponent } from './recall-time-sheet.component';

describe('RecallTimeSheetComponent', () => {
  let component: RecallTimeSheetComponent;
  let fixture: ComponentFixture<RecallTimeSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecallTimeSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecallTimeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
