import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { IRatingRowData } from '../../../models';
import { DialogBoxService, DialogBoxModes, DialogBoxQinfoComponent } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { RatingEditMode } from '../../../enumerations';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { IObjectiveRating } from '@nutela/models/talent/performance';

@Component({
  selector: 'x365-fm-talent-rating-row-template',
  templateUrl: './rating-row-template.component.html',
  styleUrls: ['./rating-row-template.component.scss']
})
export class RatingRowTemplateComponent implements OnInit {
  @Input() public index: number = null;
  @Input() public data: IRatingRowData;


  @Input() public valueLabelRatings: ISelectOption;

  @Input() public empRatingValue: string;
  @Input() public revRatingValue: string;
  @Input() public mode: RatingEditMode = RatingEditMode.EMP_EDIT;

  @Input() public useInputTextForRating: boolean;

  @ViewChild('objInfoModal') public objInfoModal: ModalDirective;


  constructor(private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
  }

  onRaveButtonClicked() {
    if (this.data.info !== null ||  this.data.info === '' || this.data.info !== '.') {
      this.dialogBoxService.showCustom(this.data.info, DialogBoxQinfoComponent, DialogBoxModes.MODALESS);
    }
  }

  onEmployeeRatingSelected($event: ISelectOption) {
    this.data.empRatingText = $event.label;
  }

  onReviewerRatingSelected($event: ISelectOption) {
    this.data.revRatingText = $event.label;
  }

  get isEmployeeRatingAvailable(): boolean {
    if (!this.data.empRatingText) {
      return false;
    } else {
      return true;
    }
  }

  get isEmployeeRatingCommentAvailable(): boolean {
    if (!this.data.emp_comment) {
      return false;
    } else {
      return true;
    }
  }

  get isLineManagerRatingAvailable(): boolean {
    if (!this.data.revRatingText) {
      return false;
    } else {
      return true;
    }
  }

  get isLineManagerRatingCommentAvailable(): boolean {
    if (!this.data.reviewer_comment) {
      return false;
    } else {
      return true;
    }
  }

  get employeeEditField(): boolean {
    if (this.mode === RatingEditMode.EMP_EDIT) {
      return true;
    } else if (this.mode === RatingEditMode.EMP_READ_ONLY) {
      return false;
    } else if (this.mode === RatingEditMode.LMGR_EDIT) {
      return false;
    } else if (this.mode === RatingEditMode.LMGR_READ_ONLY) {
      return false
    }
  }

  get employeeReadField(): boolean {
    if (this.mode === RatingEditMode.EMP_EDIT) {
      return false;
    } else if (this.mode === RatingEditMode.EMP_READ_ONLY) {
      return true;
    } else if (this.mode === RatingEditMode.LMGR_EDIT) {
      return true;
    } else if (this.mode === RatingEditMode.LMGR_READ_ONLY) {
      return true
    }
  }

  get lineManagerEditField(): boolean {
    if (this.mode === RatingEditMode.EMP_EDIT) {
      return false;
    } else if (this.mode === RatingEditMode.EMP_READ_ONLY) {
      return false;
    } else if (this.mode === RatingEditMode.LMGR_EDIT) {
      return true;
    } else if (this.mode === RatingEditMode.LMGR_READ_ONLY) {
      return false
    }
  }

  get lineManagerReadField(): boolean {
    if (this.mode === RatingEditMode.EMP_EDIT) {
      return false;
    } else if (this.mode === RatingEditMode.EMP_READ_ONLY) {
      return false;
    } else if (this.mode === RatingEditMode.LMGR_EDIT) {
      return false;
    } else if (this.mode === RatingEditMode.LMGR_READ_ONLY) {
      return true;
    }
  }
}
