import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaeComponent } from './formulae.component';

describe('FormulaeComponent', () => {
  let component: FormulaeComponent;
  let fixture: ComponentFixture<FormulaeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
