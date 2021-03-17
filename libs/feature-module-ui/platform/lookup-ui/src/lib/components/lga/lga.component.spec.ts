import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LgaComponent } from './lga.component';

describe('LgaComponent', () => {
  let component: LgaComponent;
  let fixture: ComponentFixture<LgaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LgaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
