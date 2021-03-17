import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeBoardCardComponent } from './notice-board-card.component';

describe('NoticeBoardCardComponent', () => {
  let component: NoticeBoardCardComponent;
  let fixture: ComponentFixture<NoticeBoardCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoticeBoardCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeBoardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
