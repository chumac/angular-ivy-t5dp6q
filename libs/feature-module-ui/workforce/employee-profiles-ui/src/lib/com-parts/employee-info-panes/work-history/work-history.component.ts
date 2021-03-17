import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { getPreviousEmployerData, LoadApprovedDataWorkHistorySuccess, LoadAwaitingApprovalDataWorkHistorySuccess, getWorkHistoryApprovedData, getWorkHistoryAwaitingApprovalData, showViewerWorkHistory, showEditorWorkHistory, HideEditorWorkHistory, ShowEditorWorkHistory, ShowViewerWorkHistory, HideViewerWorkHistory, LoadDocumentWorkHistory, getWorkHistoryDocument, LoadInlineDocumentWorkHistory, DeleteApprovedDataWorkHistory, LoadDataWorkHistory, DeleteAwaitingApprovalDataWorkHistory } from '@nutela/store/modules/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';
import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { APPROVAL_STATUS } from '@nutela/shared/app-global';
import { WorkHistoryEditorComponent } from './work-history-editor/work-history-editor.component';
import { WorkHistoryViewerComponent } from './work-history-viewer/work-history-viewer.component';
import { ISelectOptionData, ISubscriptions } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation, UtilService } from '@nutela/core-services';
import { DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';

@Component({
  selector: 'x365-fm-workforce-work-history',
  templateUrl: './work-history.component.html',
  styleUrls: ['./work-history.component.scss']
})
export class WorkHistoryComponent implements OnInit, OnDestroy {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];

  previousEmployerData$: Observable<IPreviousEmployer[]>;

  approvedData$: Observable<IPreviousEmployer[]>;
  awaitingApprovalData$: Observable<IPreviousEmployer[]>;
  documentData$: Observable<any>;

  @ViewChild('editor') editor: WorkHistoryEditorComponent;
  @ViewChild('viewer') viewer: WorkHistoryViewerComponent;

  private subscriptions: ISubscriptions = {};

  constructor(private utilService: UtilService, private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorWorkHistory));
    this.showViewer$ = this.store.pipe(select(showViewerWorkHistory));

    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));

    this.previousEmployerData$ = this.store.pipe(select(getPreviousEmployerData));

    this.approvedData$ = this.store.pipe(select(getWorkHistoryApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getWorkHistoryAwaitingApprovalData));
    this.documentData$ = this.store.pipe(select(getWorkHistoryDocument));
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataWorkHistory());
    this.subscriptions['approvedData'] = this.previousEmployerData$
      .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.approved)))
        .subscribe((result) => {
            this.store.dispatch(new LoadApprovedDataWorkHistorySuccess(result));
          }
        );

    this.subscriptions['queueData'] = this.previousEmployerData$
      .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.queued)))
        .subscribe((result) => {
            this.store.dispatch(new LoadAwaitingApprovalDataWorkHistorySuccess(result));
          }
        );
  }

  getRowApprovedData$(rowId: number): Observable<IPreviousEmployer> {
    return this.previousEmployerData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.approved)),
      map(d => d.filter(v => v.prev_id === rowId)),
      map(e => e.shift()))
  }

  getRowAwaitingApprovalData$(rowId: number): Observable<IPreviousEmployer> {
    return this.previousEmployerData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.queued)),
      map(d => d.filter(v => v.prev_id === rowId)),
      map(e => e.shift()))
  }

  getViewRowAwaitingApprovalData$(rowId: number): Observable<IPreviousEmployer> {
    return this.awaitingApprovalData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.queued)),
      map(d => d.filter(v => v.prev_id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.subscriptions['editData'] = this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorWorkHistory());
        }
      );
  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.subscriptions['viewApprovedData'] = this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentWorkHistory({recordId: rowId, isApproved: true}));
          }

          this.store.dispatch(new ShowViewerWorkHistory());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.subscriptions['viewAwaitingData'] = this.getViewRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentWorkHistory({recordId: rowId, isApproved: false}));
          }

          this.store.dispatch(new ShowViewerWorkHistory());
        }
      );
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteApprovedDataWorkHistory({ recordId: rowId }));
      }
    });
    // this.subscriptions['deleteData'] = this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteApprovedDataWorkHistory({recordId: rowId}));
    //     }
    //   });
  }

  onAwaitingApprovalDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteAwaitingApprovalDataWorkHistory({ recordId: rowId }));
      }
    });
    // this.subscriptions['deleteAwaitingData'] = this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`)
    // .pipe(take(1)).subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteAwaitingApprovalDataWorkHistory({recordId: rowId}));
    //       // this.store.dispatch(new RemoveAwaitingApprovalDataWorkHistory({recordId: rowId}));
    //     }
    //   });
  }

  onApprovedDownloadIconClicked(rowId: number) {
    this.subscriptions['approvedDownload'] = this.getRowApprovedData$(rowId)
    .pipe(take(1)).subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentWorkHistory({recordId: rowId, isApproved: true}));
          }
        }
      );
  }

  onAwaitingApprovalDownloadIconClicked(rowId: number) {
    this.subscriptions['awaitingApprovalDownload'] = this.getViewRowAwaitingApprovalData$(rowId)
    .pipe(take(1)).subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentWorkHistory({recordId: rowId, isApproved: false}));
          }
        }
      );
  }

  hasDocumentApproved(rowId: number):boolean {
    let status = false;

    this.subscriptions['hasDocApproved'] = this.getRowApprovedData$(rowId)
    .pipe(take(1)).subscribe((result) => {
          if (result.img_url !== null || result.img_url === '') {
            status = true;
          } else {
            status = false;
          }
        }
      );

    return status;
  }

  showEditor() {
    this.editor.data = null;
    this.store.dispatch(new ShowEditorWorkHistory());
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorWorkHistory());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerWorkHistory());
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
