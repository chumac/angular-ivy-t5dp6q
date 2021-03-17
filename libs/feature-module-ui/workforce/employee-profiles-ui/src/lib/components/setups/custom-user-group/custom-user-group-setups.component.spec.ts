import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomUserGroupSetupsComponent } from './custom-user-group-setups.component';

describe('CustomUserGroupSetupsComponent', () => {
  let component: CustomUserGroupSetupsComponent;
  let fixture: ComponentFixture<CustomUserGroupSetupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomUserGroupSetupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomUserGroupSetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
