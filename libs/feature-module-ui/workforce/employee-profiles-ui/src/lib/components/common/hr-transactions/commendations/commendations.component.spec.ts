import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommendationsComponent } from './commendations.component';

describe('CommendationsComponent', () => {
  let component: CommendationsComponent;
  let fixture: ComponentFixture<CommendationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommendationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
