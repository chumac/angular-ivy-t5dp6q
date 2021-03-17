import { async, TestBed } from '@angular/core/testing';
import { UiComponentsWorkforcePersonnelUiModule } from './ui-components-workforce-personnel-ui.module';

describe('UiComponentsWorkforcePersonnelUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiComponentsWorkforcePersonnelUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiComponentsWorkforcePersonnelUiModule).toBeDefined();
  });
});
