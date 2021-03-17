import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReInstateComponent } from './re-instate.component';

describe('ReInstateComponent', () => {
  let component: ReInstateComponent;
  let fixture: ComponentFixture<ReInstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReInstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReInstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
