import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedInfoComponent } from './detailed-info.component';

describe('DetailedInfoComponent', () => {
  let component: DetailedInfoComponent;
  let fixture: ComponentFixture<DetailedInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
