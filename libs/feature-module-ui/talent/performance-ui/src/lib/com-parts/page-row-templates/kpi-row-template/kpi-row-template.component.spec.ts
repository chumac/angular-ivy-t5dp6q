import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiRowTemplateComponent } from './kpi-row-template.component';

describe('KpiRowTemplateComponent', () => {
  let component: KpiRowTemplateComponent;
  let fixture: ComponentFixture<KpiRowTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiRowTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiRowTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
