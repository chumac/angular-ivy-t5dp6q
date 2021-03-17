import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, ViewChild } from '@angular/core';
import { ICommentBoxData } from '../../interfaces';
import { IProgressDefinition, IProgressTransaction, ITransactionComment } from '@nutela/models/talent/performance';
import { Observable } from 'rxjs/internal/Observable';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { Store, select, ActionsSubject  } from '@ngrx/store';
import { IPerformanceState, LoadProgressTransactionInfo, showEditorProgressTransaction, ShowProgressTransactionEditor, HideProgressTransactionEditor } from '../../store';
import { SlTimelineService } from './sl-timeline.service';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsError, toastOptionsSuccess } from '@nutela/core-services';
import { ProgressTransactionEditorComponent } from '../../components/common';
import { Subscription, from } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, VERSION} from '@angular/material';
import { SlCommentComponent } from '../sl-comment/sl-comment.component';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'x365-fm-talent-si-timeline',
  templateUrl: './sl-timeline.component.html',
  styleUrls: ['./sl-timeline.component.scss'],
  providers: [SlTimelineService],
}
)
export class SlTimelineComponent implements OnInit {
  @Input() data: IProgressDefinition;
  @Input() objectiveId: number;
  @Input() lineManagerPhoto$: any;

  version = VERSION;
  commentDialogRef: MatDialogRef<SlCommentComponent>;

  employeePhoto: any;
  showProgressTransactionEditor$: Observable<boolean>;
  progressTransactionInfo: IProgressTransaction[];
  isDeleting: boolean = false;
  errorMessage = [];
  subsc = new Subscription();


  constructor(private store: Store<IPerformanceState>, public dialog: MatDialog, private actionsSubject: ActionsSubject, private slTimelineService: SlTimelineService, private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.subsc = this.actionsSubject.subscribe(data => { 
        if(data.type === '[PERFORMANCE PROGRESS REPORT] Save Progress Transaction Success') {
          this.storeDispatches();
        }
    });

    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
   this.slTimelineService.getTransaction(this.data?this.data.id:null).pipe(take(1))
    .subscribe((data)=>{
      if(data.Success){
        this.progressTransactionInfo = <IProgressTransaction[]>data.Results;
        console.log('progress transaction', data.Results)
      } else {
        this.errorMessage.push('Error Loading Transaction');
      }
    }, 
    (error)=>{
      this.errorMessage.push('Error Loading Transaction');
    });
  }

  storeSelects() {}

  onTransactionDeleteIconClicked(data){
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.isDeleting = true;   
        this.slTimelineService.deleteTransaction(data.id)
        .subscribe((data)=>{
          if(data.Success){
            this.isDeleting = false;   
            new ShowToast({ title: null, message: `Your data was deleted successfully.`, options: toastOptionsSuccess() }),
            this.ngOnInit();
          } else {
            this.isDeleting = false;   
            this.store.dispatch(new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be deleted.`, options: toastOptionsError()}));
          }
        }, 
        (error)=>{
          this.store.dispatch(new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be deleted.`, options: toastOptionsError()}));
        });      
      }
    }); 
  }

  onTransactionCommentDeleteIconClicked(data: ITransactionComment) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.isDeleting = true;  
        this.slTimelineService.deleteComment(data.id)
        .subscribe((data)=>{
          if(data.Success){
            this.isDeleting = false;   
            new ShowToast({ title: null, message: `Your data was deleted successfully.`, options: toastOptionsSuccess() }),
            this.ngOnInit();
          } else {
            this.isDeleting = false;   
            this.store.dispatch(new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be deleted.`, options: toastOptionsError()}));
          }
        }, 
        (error)=>{
          this.store.dispatch(new ShowToast({title: 'Data Could Not Be Deleted', message: `Something went wrong. Form data could not be deleted.`, options: toastOptionsError()}));
        });      
      }
    }); 
  }

  onTransactionDownloadIconClicked() {

  }

  onTransactionCommentDownloadIconClicked() {

  }

  onAddCommentIconClicked(resultset: IProgressTransaction): void {
    this.commentDialogRef = this.dialog.open(SlCommentComponent, {
      width: '450px',
      data: resultset,
      panelClass: 'custom-dialog-container'
    });

    this.commentDialogRef.afterClosed().subscribe(data => {
      if(data === true){
        this.storeDispatches();
      }
    });
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
  

}
