import { Component, OnInit } from '@angular/core';

import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { CreateTimeSheetService } from './create-time-sheet.service';
import { MatDialogRef } from '@angular/material';
import { UtilService, formatDate } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { IRootState } from '../../../store';
import { ShowToast } from '@nutela/store/shared';
import { CreateTimeSheet, LoadingTimeSheet } from '../../../store/time-sheet';

@Component({
  selector: 'x365-fm-workforce-time-create-time-sheet',
  templateUrl: './create-time-sheet.component.html',
  styleUrls: ['./create-time-sheet.component.scss'],
  providers: [CreateTimeSheetService]
})
export class CreateTimeSheetComponent  extends BaseFormComponent implements OnInit {

  constructor(public fs: CreateTimeSheetService, public utilService: UtilService, private store: Store<IRootState>, private dialogRef: MatDialogRef<CreateTimeSheetComponent>) {
    super();
  }

  ngOnInit() {
    this.fs.f.setValue({end_date: null, description: null});
  }

  onOkClick() {
    if (this.fs.valid) {
      this.fs.endDate.setValue(formatDate(this.fs.endDate.value));

      const payload = {
        end_date: this.fs.endDate.value,
        description: this.fs.description.value,
      };

      this.store.dispatch(new LoadingTimeSheet());
      this.store.dispatch(new CreateTimeSheet(payload));

      this.fs.f.setValue({end_date: null, description: null});
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
    this.fs.f.setValue({end_date: null, description: null});
    this.dialogRef.close();
  }
}
