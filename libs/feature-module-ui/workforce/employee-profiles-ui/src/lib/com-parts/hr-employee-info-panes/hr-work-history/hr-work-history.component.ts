import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { HrWorkHistoryEditorComponent } from './hr-work-history-editor/hr-work-history-editor.component';
import { HrWorkHistoryViewerComponent } from './hr-work-history-viewer/hr-work-history-viewer.component';
import { IEmployeesProfileState } from '../../../store';
import { ActivatedRoute } from '@angular/router';
import { showEditorHRWorkHistory, showViewerHRWorkHistory, getHRWorkHistoryApprovedData,
  getHRWorkHistoryAwaitingApprovalData, getHRWorkHistoryDocument,
  ShowEditorHRWorkHistory, LoadDocumentHRWorkHistory, ShowViewerHRWorkHistory,
  DeleteApprovedDataHRWorkHistory, LoadInlineDocumentHRWorkHistory, HideEditorHRWorkHistory,
  HideViewerHRWorkHistory, LoadApprovedDataHRWorkHistory, LoadAwaitingApprovalDataHRWorkHistory,
  ProcessingHRWorkHistory,
  DeleteAwaitingApprovalDataHRWorkHistory} from '../../../store/employee-detailed-area';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'x365-fm-workforce-hr-work-history',
  templateUrl: './hr-work-history.component.html',
  styleUrls: ['./hr-work-history.component.scss']
})
export class HrWorkHistoryComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];
  @Input() employeeId:number;

  approvedData$: Observable<IPreviousEmployer[]>;
  awaitingApprovalData$: Observable<IPreviousEmployer[]>;
  documentData$: Observable<any>;

  @ViewChild('editor') editor: HrWorkHistoryEditorComponent;
  @ViewChild('viewer') viewer: HrWorkHistoryViewerComponent;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private store: Store<IEmployeesProfileState>,
  private dialogService: DialogService,
  private activatedRoute:ActivatedRoute) {
    titleService.setTitle(
      `${'HR Work History'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorHRWorkHistory));
    this.showViewer$ = this.store.pipe(select(showViewerHRWorkHistory));

    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));



    this.approvedData$ = this.store.pipe(select(getHRWorkHistoryApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getHRWorkHistoryAwaitingApprovalData));
    this.documentData$ = this.store.pipe(select(getHRWorkHistoryDocument));
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataHRWorkHistory({employeeId:this.employeeId}));
    this.store.dispatch(new LoadAwaitingApprovalDataHRWorkHistory({employeeId:this.employeeId}));
    this.store.dispatch(new ProcessingHRWorkHistory());
  }

  getApprovedData$(rowId: number): Observable<IPreviousEmployer> {
    return this.approvedData$.pipe(
      map(d => d.filter(v => v.prev_id === rowId)),
      map(e => e.shift()))
  }

  getAwaitingApprovalData$(rowId: number): Observable<IPreviousEmployer> {
    return this.awaitingApprovalData$.pipe(
      map(d => d.filter(v => v.prev_id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorHRWorkHistory());
        }
      );
  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentHRWorkHistory({recordId: rowId, isApproved: true}));
          }

          this.store.dispatch(new ShowViewerHRWorkHistory());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentHRWorkHistory({recordId: rowId, isApproved: false}));
          }

          this.store.dispatch(new ShowViewerHRWorkHistory());
        }
      );
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteApprovedDataHRWorkHistory({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteApprovedDataHRWorkHistory({recordId: rowId,employeeId:this.employeeId}));
    //     }
    //   });
  }

  onAwaitingApprovalDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteAwaitingApprovalDataHRWorkHistory({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteAwaitingApprovalDataHRWorkHistory({recordId: rowId,employeeId:this.employeeId}));
    //     }
    //   });
  }

  onApprovedDownloadIconClicked(rowId: number) {
    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentHRWorkHistory({recordId: rowId, isApproved: true, employeeId: this.employeeId  }));
          }
        }
      );
  }

  onAwaitingApprovalDownloadIconClicked(rowId: number) {
    this.getAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentHRWorkHistory({recordId: rowId, isApproved: false, employeeId: this.employeeId }));
          }
        }
      );
  }

  hasDocumentApproved(rowId: number):boolean {
    let status = false;

    this.getApprovedData$(rowId)
      .subscribe((result) => {
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
    this.store.dispatch(new ShowEditorHRWorkHistory());
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorHRWorkHistory());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHRWorkHistory());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
