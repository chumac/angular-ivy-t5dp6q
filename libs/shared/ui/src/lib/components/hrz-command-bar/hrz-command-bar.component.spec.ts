import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrzCommandBarComponent } from './hrz-command-bar.component';

describe('HrzCommandBarComponent', () => {
  let component: HrzCommandBarComponent;
  let fixture: ComponentFixture<HrzCommandBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HrzCommandBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrzCommandBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
