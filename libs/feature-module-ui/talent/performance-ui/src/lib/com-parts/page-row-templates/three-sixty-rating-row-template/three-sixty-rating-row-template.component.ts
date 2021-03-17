
import { Component, OnInit, Input } from '@angular/core';

import { IThreeSixtyRatingRowData } from '../../../models';
import { DialogBoxService, DialogBoxModes } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { RatingEditMode } from '../../../enumerations';

@Component({
  selector: 'x365-fm-talent-three-sixty-rating-row-template',
  templateUrl: './three-sixty-rating-row-template.component.html',
  styleUrls: ['./three-sixty-rating-row-template.component.scss']
})
export class ThreeSixtyRatingRowTemplateComponent implements OnInit {
  @Input() public index: number = null;
  @Input() public data: IThreeSixtyRatingRowData;
  @Input() public mode: RatingEditMode = RatingEditMode.EMP_EDIT;

  constructor(private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
  }

  onRaveButtonClicked() {
    this.dialogBoxService.show(this.data.info, DialogBoxModes.MODALESS);
  }

  onEmployeeRatingSelected($event: ISelectOption) {
    this.data.empRatingText = $event.label;
  }

  onReviewerRatingSelected($event: ISelectOption) {

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
