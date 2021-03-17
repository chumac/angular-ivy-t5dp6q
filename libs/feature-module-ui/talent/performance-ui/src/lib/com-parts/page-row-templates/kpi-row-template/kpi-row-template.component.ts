import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { IKPIRowData } from '../../../models';
import { IObjectiveRating } from '@nutela/models/talent/performance';
import { ISelectOption } from 'dist/libs/models/core-data';
import { RatingEditMode } from '../../../enumerations';
import { DialogBoxService, DialogBoxQinfoComponent, DialogBoxModes } from '@nutela/shared/ui';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { MANAGE_OBJECTIVES_URLs } from '../../../constants';
import { IPerformanceState, SetLMStatusProgressDefinition } from '../../../store';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'x365-fm-talent-kpi-row-template',
  templateUrl: './kpi-row-template.component.html',
  styleUrls: ['./kpi-row-template.component.scss']
})
export class KpiRowTemplateComponent implements OnInit {
  @Input() public index: number = null;
  @Input() public data: IKPIRowData;
  @Input() public ratings: IObjectiveRating[];
  @Input() public valueLabelRatings: ISelectOption[];
  @Input() public mode: RatingEditMode = RatingEditMode.EMP_EDIT;

  @Input() public useInputTextForRating: boolean;

  @ViewChild('objInfoModal') public objInfoModal: ModalDirective;
  currentUserEditRole: number;
  ratingEnumeration = RatingEditMode;

  constructor(private dialogBoxService: DialogBoxService, private store: Store<IPerformanceState>, public router: Router) { }

  ngOnInit() {
  }

  onRaveButtonClicked() {
    if (this.data.legend_info  !== null ||  this.data.legend_info === '' || this.data.legend_info !== '.') {
      this.dialogBoxService.showCustom(this.data.legend_info, DialogBoxQinfoComponent, DialogBoxModes.MODALESS);
    }
  }

  onInfoButtonClicked(selectingUserRole) {
    this.currentUserEditRole = selectingUserRole;
    this.objInfoModal.show();
  }

  onProgressBtnClicked(objectiveId) {
    // this.store.dispatch(new SetLMStatusProgressDefinition({ status: false }));
    this.goToProgressReport(objectiveId);
  }

  goToProgressReport(id: number) {
    // console.log('objId: ', id)
    this.router.navigate([MANAGE_OBJECTIVES_URLs.progressReportUrl, id], { skipLocationChange: false });
  }

  onUseInfoClicked(selectedRatingValue: IObjectiveRating) {
    if(this.currentUserEditRole === RatingEditMode.EMP_EDIT) {
      this.data.ratingId = selectedRatingValue.id;
      this.data.comment = selectedRatingValue.dictionary;

      const transformedSelection: ISelectOption = { value: selectedRatingValue.id, label: selectedRatingValue.description };
      this.onRatingSelected(transformedSelection);
    }

    if(this.currentUserEditRole === RatingEditMode.LMGR_EDIT) {
      this.data.lmRatingId = selectedRatingValue.id;
      this.data.lmComment = selectedRatingValue.dictionary;

      const transformedSelection: ISelectOption = { value: selectedRatingValue.id, label: selectedRatingValue.description };
      this.onLineManagerRatingSelected(transformedSelection);

    }

    this.objInfoModal.hide();
  }

  onRatingSelected($event: ISelectOption) {
    const rating = this.getRatingObject(Number($event.value));
    if (rating) {
      this.data.ratingValue = rating.rating_value;
      this.data.ratingText = rating.description;
    }
  }

  onLineManagerRatingSelected($event: ISelectOption) {
    const rating = this.getRatingObject(Number($event.value));
    if (rating) {
      this.data.lmRatingValue = rating.rating_value;
      this.data.lmRatingText = rating.description;
    }
  }

  getRatingObject(ratingId: number): IObjectiveRating {
    for (let rating of this.ratings) {
      if (rating.id === ratingId) {
        return rating;
      }
    }
  }

  get isEmployeeRatingAvailable(): boolean {
    if (!this.data.ratingText) {
      return false;
    } else {
      return true;
    }
  }

  get isEmployeeRatingCommentAvailable(): boolean {
    if (!this.data.comment) {
      return false;
    } else {
      return true;
    }
  }

  get isLineManagerRatingAvailable(): boolean {
    if (!this.data.lmRatingText) {
      return false;
    } else {
      return true;
    }
  }

  get isLineManagerRatingCommentAvailable(): boolean {
    if (!this.data.lmComment) {
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
