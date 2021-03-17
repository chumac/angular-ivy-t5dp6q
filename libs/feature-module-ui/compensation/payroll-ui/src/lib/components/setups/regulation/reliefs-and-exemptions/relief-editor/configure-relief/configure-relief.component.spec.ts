import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureReliefComponent } from './configure-relief.component';

describe('ConfigureReliefComponent', () => {
  let component: ConfigureReliefComponent;
  let fixture: ComponentFixture<ConfigureReliefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureReliefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureReliefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
