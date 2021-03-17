import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, Inject} from '@angular/core';
import { SlCommentService } from './sl-comment.service';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { IPerformanceState } from '../../store';
import { Store } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsError, UtilService, toastOptionsSuccess } from '@nutela/core-services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as constants from '../../constants';
import { IProgressTransaction } from '@nutela/models/talent/performance';
import { from } from 'rxjs/internal/observable/from';
import { SlTimelineService } from '../sl-timeline/sl-timeline.service';


@Component({
  selector: 'x365-fm-talent-sl-comment',
  templateUrl: './sl-comment.component.html',
  styleUrls: ['./sl-comment.component.scss'],
  providers: [SlCommentService],
})
export class SlCommentComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean = true;
  @Input() public width: number;
  @Input() public data: any;
  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;
  lineManagerRoleOptions = constants.lineManagerRoleOptions;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public fs: SlCommentService, public utilService: UtilService, private store: Store<IPerformanceState>, private dialogRef: MatDialogRef<SlCommentComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: IProgressTransaction, private slTimelineService: SlTimelineService) {
    super();
  }

  ngOnInit() {
  }

  onFileSelected(data: any) {
    if (data) {
      this.fs.patch({
        doc_binary: data.content,
        doc_extension: data.extension,
        doc_mime: null
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported', type: ToastTypes.ERROR }));
    }
  }

  onFileRemoved(data: any) {
    this.fs.patch({
      doc_binary: null,
      doc_extension: '',
      doc_mime: null
    });
  }

  onCancelButtonClicked() {
    this.dialogRef.close();
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCancel() {
    this.reset();
    this.cancelClick.emit();
  }

  onSubmit(){
    if (this.fs.valid) {
      // this.fs.employeeId.setValue(this.dialogData.employeeInfo.employee_id);
      // this.fs.commentBy.setValue(this.dialogData.employeeInfo.employee_id);
      this.fs.transactionId.setValue(this.dialogData.id);
      this.isProcessing$ = from([true]);
      this.slTimelineService.addComment(this.fs.value)
      .subscribe((data)=>{
        if(data.Success){
          this.isProcessing$ = from([false]);
          this.dialogRef.close(true);
          this.store.dispatch(new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }));
        } else {
          this.isProcessing$ = from([false]);
          this.store.dispatch(new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be deleted.`, options: toastOptionsError()}));
        }
      },
      (error)=>{
        this.store.dispatch(new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be deleted.`, options: toastOptionsError()}));
      });

    } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {}

}

