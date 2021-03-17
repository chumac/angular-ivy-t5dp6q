import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupNavigationComponent } from './lookup-navigation.component';

describe('LookupNavigationComponent', () => {
  let component: LookupNavigationComponent;
  let fixture: ComponentFixture<LookupNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
