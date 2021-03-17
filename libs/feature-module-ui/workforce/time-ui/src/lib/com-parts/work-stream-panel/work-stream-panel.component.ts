import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { IDayStreamData, IWorkStreamData } from '@nutela/models/workforce/time-sheet';
import { formatDate } from '@nutela/core-services';
import { LoadWorkStreamDataTimeSheet, LoadingWorkStream, isLoadingWorkStream, DeleteWorkStreamTimeSheet, SubmitWorkStream } from '../../store/time-sheet';
import { Observable } from 'rxjs/internal/Observable';
import { IRootState } from '../../store';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CreateWorkActivityComponent } from '../../components/common/create-work-activity/create-work-activity.component';
import { LoadWorkHourTypes } from '@nutela/store/modules/foundation';
import { IWorkActivityData } from '../../models';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-workforce-time-work-stream-panel',
  templateUrl: './work-stream-panel.component.html',
  styleUrls: ['./work-stream-panel.component.scss']
})
export class WorkStreamPanelComponent implements OnInit {
  @Input() public data: IDayStreamData;

  workActivityDialogRef: MatDialogRef<CreateWorkActivityComponent>;

  isLoadingWorkStream$: Observable<boolean>;

  constructor(private store: Store<IRootState>, private dialogBoxService: DialogBoxService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    if (this.data) {
      this.store.dispatch(new LoadingWorkStream(this.data.day_id));
      this.store.dispatch(new LoadWorkStreamDataTimeSheet(this.data.day_id));

      // this.store.dispatch(new LoadWorkHourTypes(formatDate(this.data.day_date)));
    }
  }

  storeSelects() {
    this.isLoadingWorkStream$ = this.store.pipe(select(isLoadingWorkStream(this.data.day_id)));
  }

  createWorkActivity(editData: IWorkStreamData, editFlag: boolean) {
    const data: IWorkActivityData = {timeSheetId: this.data.TimeSheet.tms_id , dayId: this.data.day_id, dayDate: this.data.day_date};
    this.workActivityDialogRef = this.dialog.open(CreateWorkActivityComponent, {
      width: '450px',
      data: {payload: { data:data, editData:editData, editMode:editFlag }},
      panelClass: 'custom-dialog-container'
    });
    this.workActivityDialogRef.afterClosed().pipe(take(1)).subscribe(data => {
      if(data === true){
        this.storeDispatches();
      }
    });
  }

  editWorkActivity($evt: IWorkStreamData) {
    this.createWorkActivity($evt, true);
  }

  deleteWorkActivity($evt: IWorkStreamData) {
    this.dialogBoxService.show(`Are you sure you want to delete this activity?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteWorkStreamTimeSheet({recordId: $evt.id, dayId: $evt.day_id}));
        }
      });
  }

  submitWorkActivity() {
    this.dialogBoxService.show(`You are about to submit this day activity for approval?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new SubmitWorkStream({recordId: this.data.day_id, timeSheetId: this.data.TimeSheet?this.data.TimeSheet.tms_id:null}));
      }
    });
  }

  get formattedDate(): string {
    return formatDate(this.data.day_date, 'dddd, Do MMMM');
  }
}
