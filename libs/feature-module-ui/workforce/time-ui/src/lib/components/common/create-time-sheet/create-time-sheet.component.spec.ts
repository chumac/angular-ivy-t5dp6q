import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTimeSheetComponent } from './create-time-sheet.component';

describe('CreateTimeSheetComponent', () => {
  let component: CreateTimeSheetComponent;
  let fixture: ComponentFixture<CreateTimeSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTimeSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTimeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
