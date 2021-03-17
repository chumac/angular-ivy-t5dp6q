import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineManagersComponent } from './lineManagers.component';

describe('LineManagersComponent', () => {
  let component: LineManagersComponent;
  let fixture: ComponentFixture<LineManagersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineManagersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
