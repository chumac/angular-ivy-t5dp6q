import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomUserGroupSetupsViewerComponent } from './custom-user-group-setups-viewer.component';

describe('CustomUserGroupSetupsViewerComponent', () => {
  let component: CustomUserGroupSetupsViewerComponent;
  let fixture: ComponentFixture<CustomUserGroupSetupsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomUserGroupSetupsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomUserGroupSetupsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
