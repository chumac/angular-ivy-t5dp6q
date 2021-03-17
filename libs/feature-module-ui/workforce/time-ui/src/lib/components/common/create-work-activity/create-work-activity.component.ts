import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef } from '@angular/core';

import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { CreateWorkActivityService } from './create-work-activity.service';
import { UtilService, formatDate } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
;
import { ISelectOption, IApiResult, IBasicData } from '@nutela/models/core-data';
import { Observable } from 'rxjs/internal/Observable';
import { getProjects, getCostCenters } from '@nutela/store/modules/foundation';
import { IAppState } from '@nutela/store/app-state';
import { ShowToast } from '@nutela/store/shared';
import { Subscription } from 'rxjs/internal/Subscription';
import { IWorkActivityData } from '../../../models';
import { LoadDayStreamDataTimeSheet, LoadTimeSheetProjectsById, getTimeSheetProjectById } from '../../../store/time-sheet';
import { IWorkStreamData, ITimeSheetProject } from '@nutela/models/workforce/time-sheet';
import { DxLookupComponent } from 'devextreme-angular';
import { IStructureTree } from '@nutela/models/common';
import { getAnalysisDetail } from '@nutela/store/modules/workforce/employee-profiles';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-workforce-time-create-work-activity',
  templateUrl: './create-work-activity.component.html',
  styleUrls: ['./create-work-activity.component.scss'],
  providers: [CreateWorkActivityService]
})
export class CreateWorkActivityComponent extends BaseFormComponent implements OnInit, OnDestroy  {
  projects$: Observable<ITimeSheetProject[]>;
  costCenters$: Observable<ISelectOption[]>;
  myCostCenter$: Observable<any>;


  workTypeSubscription: Subscription;
  saveSubscription: Subscription;

  isProcessing: boolean = false;
  showStructureTree: boolean = false;

  @ViewChild('costCenterLookUp') costCenterLookUp: DxLookupComponent;
  @ViewChild('details') details: ElementRef;


  constructor(public fs: CreateWorkActivityService, public utilService: UtilService, private store: Store<IAppState>, private dialogRef: MatDialogRef<CreateWorkActivityComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    super()
  }

  ngOnInit() {
    this.fs.f.setValue(this.nullData);
    this.storeDispatches();
    this.storeSelects();
    this.getWorkTypes();
    this.init();
  }

  storeDispatches() {
  }

  storeSelects() {
    this.projects$ = this.store.pipe(select(getTimeSheetProjectById));
    this.costCenters$ = this.store.pipe(select(getCostCenters));
    this.myCostCenter$ = this.store.pipe(select(getAnalysisDetail));
  }

  init() {
    const editMode = this.dialogData?this.dialogData.payload.editMode:null;
    const editData: IWorkStreamData = this.dialogData?this.dialogData.payload.editData:null;
    if (editMode) {
      this.store.dispatch(new LoadTimeSheetProjectsById({recordId: editData.cost_centre_id}));

      this.fs.projectId.setValue(editData.project_id);
      this.fs.costCenterId.setValue(editData.cost_centre_id);
      this.fs.workHour.setValue(this.resolveHrFromMin(editData.wk_hours));
      this.fs.workMin.setValue(this.resolveMinFromMin(editData.wk_hours));
      this.fs.workHourType.setValue(editData.wk_hours_type);
      this.fs.description.setValue(editData.description);
    } else {
      this.setStructureLookUp();
    }
  }

  setStructureLookUp() {
    this.myCostCenter$.pipe(take(1)).subscribe((x: any)=>{ this.store.dispatch(new LoadTimeSheetProjectsById({recordId: x.details_id}));this.fs.costCenterId.setValue(x.details_id)});
  }


  getWorkTypes() {
    this.fs.valueLabelWorkTypes = [];
    const data = this.dialogData?this.dialogData.payload.data:null;

    this.workTypeSubscription = this.fs.getWorkTypes(formatDate(data.dayDate)).subscribe((data: IApiResult) => {
      if (data.Success && data.Results) {
        const workTypes = <IBasicData[]>data.Results;
        this.fs.valueLabelWorkTypes = this.utilService.transformToSelectDataList(workTypes, 'id', 'description')
      }
    });
  }

  onOkClick() {
    const data = this.dialogData.payload.data;
    const editMode = this.dialogData.payload.editMode;
    const editData: IWorkStreamData = this.dialogData?this.dialogData.payload.editData:null;


    if (this.fs.valid) {
      const payload = {
        id: editData?editData.id:null,
        timesheet_id: data.timeSheetId,
        project_id: this.fs.projectId.value,

        day_id: data.dayId,
        cost_centre_id: this.fs.costCenterId.value,

        wk_hours: this.totalWorkTime,
        wk_hours_type: this.fs.workHourType.value,

        description: this.fs.description.value
      };

      this.isProcessing = true;
      this.saveSubscription = this.fs.save(payload, editMode).subscribe(data => {
        if (data.Success) {
          this.utilService.showToast('Work Activity Created', `Data was saved successfully.`, ToastTypes.SUCCESS);
          this.fs.f.setValue(this.nullData);
          this.dialogRef.close(true);
        } else {
          this.utilService.showToast('Work Activity Not Created: Error Occured', data.ErrorMessage, ToastTypes.ERROR);
        }
      }, (error) => {
        console.log(JSON.stringify(error))
        this.isProcessing = false;
        this.utilService.showToast('Work Activity Not Created: Error Occured', `Something went wrong. Data was not saved.`, ToastTypes.ERROR);
      }, () => {
        this.isProcessing = false;
      });
    } else {
      this.store.dispatch(
        new ShowToast({
          title: 'Correct the following Errors',
          message: this.getErrorMessage(), type: ToastTypes.ERROR
        })
      );
    }
  }

  get nullData() {
    return {
      project_id: null,
      cost_centre_id: null,
      work_hour: null,
      work_min: null,
      wk_hours_type: null,
      description: null
    }
  }

  get totalWorkTime(): number {
    // Convert to minutes

    const workHour = this.fs.workHour.value || 0;
    const workMinutes = this.fs.workMin.value || 0;

    let totalMinutes = workHour * 60;
    totalMinutes = totalMinutes + workMinutes;

    return totalMinutes;
  }

  resolveHrFromMin(value): number {
    const minutes = parseInt(value);
    let hour = Math.floor((minutes/60));;
    return hour;
  }

  resolveMinFromMin(value): number {
    const minutes = parseInt(value);
    let minute = (minutes%60);
    return minute;
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.fs.f.setValue(this.nullData);
    this.dialogRef.close();
  }

  toggleStructurTreeView() {
    this.showStructureTree = !this.showStructureTree
  }

  setStructure($evt: IStructureTree) {
    this.fs.costCenterId.patchValue($evt.structure_id);
    this.store.dispatch(new LoadTimeSheetProjectsById({recordId: $evt.structure_id}));
  }

  unsubscribe() {
    this.utilService.unsubscribe(this.workTypeSubscription);
    this.utilService.unsubscribe(this.saveSubscription);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
