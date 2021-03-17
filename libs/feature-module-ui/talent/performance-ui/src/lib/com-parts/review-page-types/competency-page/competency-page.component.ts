import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IReviewPageParameter } from '../../../models';
import { IReviewPageComponent } from '../../../interfaces';

@Component({
  selector: 'x365-fm-talent-competency-page',
  templateUrl: './competency-page.component.html',
  styleUrls: ['./competency-page.component.scss']
})
export class CompetencyPageComponent implements OnInit, IReviewPageComponent {
  @Input() show: boolean;
  @Input() parameter: IReviewPageParameter;

  @Output() saveAndContinueProcessingEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() completeSectionProcessingEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  completeSection(): void {
    return;
  }

  get isCompleted(): boolean {
    return false;
  }
}
