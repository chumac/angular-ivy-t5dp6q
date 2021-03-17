
import { Component, OnInit, Input } from '@angular/core';

import { IRatingRowData } from '../../../models';
import { DialogBoxService, DialogBoxModes, DialogBoxQinfoComponent } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { RatingEditMode } from '../../../enumerations';

@Component({
  selector: 'x365-fm-talent-rating-feedback-row-template',
  templateUrl: './rating-feedback-row-template.component.html',
  styleUrls: ['./rating-feedback-row-template.component.scss']
})
export class RatingFeedbackRowTemplateComponent implements OnInit {
  @Input() public index: number = null;
  @Input() public data: IRatingRowData;


  @Input() public valueLabelRatings: ISelectOption;

  @Input() public empRatingValue: string;
  @Input() public revRatingValue: string;
  @Input() public mode: RatingEditMode = RatingEditMode.EMP_EDIT;

  @Input() public useInputTextForRating: boolean;

  constructor(private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
  }

  onRaveButtonClicked() {
    if (this.data.info !== null ||  this.data.info === '' || this.data.info !== '.') {
      this.dialogBoxService.showCustom(this.data.info, DialogBoxQinfoComponent, DialogBoxModes.MODALESS);
    }
  }



  get isEmployeeRatingCommentAvailable(): boolean {
    if (!this.data.emp_comment) {
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
