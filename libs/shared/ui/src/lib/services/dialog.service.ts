import { Injectable, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { DialogComponent } from '../components/dialog/dialog.component';



@Injectable({
  providedIn: 'root'
})
export class DialogService {

  // dialogRef: MatDialogRef<DialogComponent>;

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<DialogComponent> ) { }

  public show(options: any, message?: string) {
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: options.title,
        message,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }
    });
  }

  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
      return res;
    }
    ));
  }

  options(): any {
    return {
      title: 'Confirm Action',
      message: 'Are you sure you want to complete this action?',
      cancelText: 'Not anymore',
      confirmText: 'Yes Proceed'
    };
  }
}
