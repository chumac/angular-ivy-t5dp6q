import { EventEmitter } from "@angular/core";

import { IReviewPageParameter } from "../models";

export interface IReviewPageComponent {
  show: boolean
  parameter: IReviewPageParameter
  isCompleted: boolean;

  load?(): void
  setPageTitle?(title: string): void
  setPageSubTitle?(subTitle: string): void
  saveAndContinue?(): void;
  completeSection(): void;
  reOpenCompletedSection?(): void;

  saveAndContinueProcessingEmitter: EventEmitter<boolean>;
  completeSectionProcessingEmitter: EventEmitter<boolean>;
  formCompleteEmitter?: EventEmitter<void>;
}
