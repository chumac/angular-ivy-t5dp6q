import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparationsComponent } from './separations.component';

describe('SeparationsComponent', () => {
  let component: SeparationsComponent;
  let fixture: ComponentFixture<SeparationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeparationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
