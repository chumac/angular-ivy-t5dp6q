import { async, TestBed } from '@angular/core/testing';
import { UiComponentsWorkforceLeaveUiModule } from './ui-components-workforce-leave-ui.module';

describe('UiComponentsWorkforceLeaveUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiComponentsWorkforceLeaveUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiComponentsWorkforceLeaveUiModule).toBeDefined();
  });
});
