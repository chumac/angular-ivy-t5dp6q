import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrtCommandBarComponent } from './vrt-command-bar.component';

describe('VrtCommandBarComponent', () => {
  let component: VrtCommandBarComponent;
  let fixture: ComponentFixture<VrtCommandBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VrtCommandBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrtCommandBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
