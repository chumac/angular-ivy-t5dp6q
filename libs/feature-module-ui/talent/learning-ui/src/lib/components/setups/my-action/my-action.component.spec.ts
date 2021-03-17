import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyActionComponent } from './my-action.component';

describe('MyActionComponent', () => {
  let component: MyActionComponent;
  let fixture: ComponentFixture<MyActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
