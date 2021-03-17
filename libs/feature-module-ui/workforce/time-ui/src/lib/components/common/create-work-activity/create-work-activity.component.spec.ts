import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkActivityComponent } from './create-work-activity.component';

describe('CreateWorkActivityComponent', () => {
  let component: CreateWorkActivityComponent;
  let fixture: ComponentFixture<CreateWorkActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorkActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
