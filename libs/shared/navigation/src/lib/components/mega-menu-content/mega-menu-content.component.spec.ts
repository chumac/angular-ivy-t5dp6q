import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaMenuContentComponent } from './mega-menu-content.component';

describe('MegaMenuContentComponent', () => {
  let component: MegaMenuContentComponent;
  let fixture: ComponentFixture<MegaMenuContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MegaMenuContentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MegaMenuContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
