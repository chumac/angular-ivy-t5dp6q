import { Component, OnInit, Inject } from '@angular/core';

import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { RecallTimeSheetService } from './recall-time-sheet.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UtilService, formatDate } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { IRootState } from '../../../store';
import { ShowToast } from '@nutela/store/shared';
import { RecallTimeSheet, LoadingTimeSheet, SubmitRecallTimeSheet } from '../../../store/time-sheet';

@Component({
  selector: 'x365-fm-workforce-time-recall-time-sheet',
  templateUrl: './recall-time-sheet.component.html',
  styleUrls: ['./recall-time-sheet.component.scss'],
  providers: [RecallTimeSheetService]
})
export class RecallTimeSheetComponent  extends BaseFormComponent implements OnInit {
  isProcessing: boolean = false;

  constructor(public fs: RecallTimeSheetService, public utilService: UtilService, private store: Store<IRootState>, private dialogRef: MatDialogRef<RecallTimeSheetComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: number) {
    super();
  }

  ngOnInit() {
    this.fs.f.setValue({recall_reason: null});
  }

  onOkClick() {
    if (this.fs.valid) {
      const recordId: number = this.dialogData;
      // this.store.dispatch(new LoadingTimeSheet());
      this.store.dispatch(new SubmitRecallTimeSheet({data: this.fs.value, recordId: recordId}));
      this.dialogRef.close();
    } else {
      this.store.dispatch(
        new ShowToast({
          title: 'Correct the following Errors',
          message: this.getErrorMessage(), type: ToastTypes.ERROR
        })
      );
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.fs.f.reset();
    this.dialogRef.close();
  }
}
