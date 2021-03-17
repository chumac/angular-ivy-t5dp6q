import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PfasComponent } from './pfas.component';

describe('PfasComponent', () => {
  let component: PfasComponent;
  let fixture: ComponentFixture<PfasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PfasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PfasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
