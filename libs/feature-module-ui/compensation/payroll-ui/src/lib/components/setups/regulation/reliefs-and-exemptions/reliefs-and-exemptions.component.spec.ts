import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReliefsAndExemptionsComponent } from './reliefs-and-exemptions.component';

describe('ReliefsAndExemptionsComponent', () => {
  let component: ReliefsAndExemptionsComponent;
  let fixture: ComponentFixture<ReliefsAndExemptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReliefsAndExemptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReliefsAndExemptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
