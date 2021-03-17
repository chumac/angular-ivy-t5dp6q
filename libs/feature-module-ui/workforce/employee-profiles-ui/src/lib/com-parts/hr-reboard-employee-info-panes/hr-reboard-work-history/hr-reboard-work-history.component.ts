import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { HrReboardWorkHistoryEditorComponent } from './hr-reboard-work-history-editor/hr-reboard-work-history-editor.component';
import { HrReboardWorkHistoryViewerComponent } from './hr-reboard-work-history-viewer/hr-reboard-work-history-viewer.component';
import { ISelectOptionData, ISubscriptions } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation, UtilService } from '@nutela/core-services';
import { DialogService } from '@nutela/shared/ui';
import { showEditorHrReboardWorkHistory, showViewerHrReboardWorkHistory, getHrReboardWorkHistoryData, getHrReboardWorkHistoryDocument, LoadDataHrReboardWorkHistory, ShowEditorHrReboardWorkHistory, LoadDocumentHrReboardWorkHistory, ShowViewerHrReboardWorkHistory, LoadInlineDocumentHrReboardWorkHistory, HideEditorHrReboardWorkHistory, HideViewerHrReboardWorkHistory, ClearDocumentHrReboardWorkHistory, DeleteDataHrReboardWorkHistory } from '../../../store/hr-reboard-data';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-work-history',
  templateUrl: './hr-reboard-work-history.component.html',
  styleUrls: ['./hr-reboard-work-history.component.scss']
})
export class HrReboardWorkHistoryComponent implements OnInit, OnDestroy {

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  selectOptionData$: Observable<ISelectOptionData>;
  previousEmployerData$: Observable<IPreviousEmployer[]>;
  documentData$: Observable<any>;

  private subscriptions: ISubscriptions = {};
  public data: any[];
  @Input() public reboardMode: number;
  @Input() public employeeId: number;

  @ViewChild('editor') editor: HrReboardWorkHistoryEditorComponent;
  @ViewChild('viewer') viewer: HrReboardWorkHistoryViewerComponent;

  constructor(private utilService: UtilService, private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorHrReboardWorkHistory));
    this.showViewer$ = this.store.pipe(select(showViewerHrReboardWorkHistory));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.previousEmployerData$ = this.store.pipe(select(getHrReboardWorkHistoryData));
    this.documentData$ = this.store.pipe(select(getHrReboardWorkHistoryDocument));
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataHrReboardWorkHistory({ employeeId: this.employeeId}));
  }

  getRowData$(rowId: number): Observable<IPreviousEmployer> {
    return this.previousEmployerData$.pipe(
      map(d => d.filter(v => v.prev_id === rowId)),
      map(e => e.shift()))
  }

  canEdit(): boolean {
    let status: boolean;
    if (this.reboardMode === 1 || this.reboardMode === 2) {
      status = true;
    } else {
      status = false;
    }
    return status;
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

   this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorHrReboardWorkHistory());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentHrReboardWorkHistory({recordId: rowId, isApproved: true}));
          }

          this.store.dispatch(new ShowViewerHrReboardWorkHistory());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteDataHrReboardWorkHistory({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
  }

  onDownloadIconClicked(rowId: number) {
    this.subscriptions['approvedDownload'] = this.getRowData$(rowId)
    .pipe(take(1)).subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentHrReboardWorkHistory({recordId: rowId, isApproved: true}));
          }
        }
      );
  }

  hasDocumentApproved(rowId: number):boolean {
    let status = false;

    this.subscriptions['hasDocApproved'] = this.getRowData$(rowId)
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

  onCancelEditor() {
    this.store.dispatch(new HideEditorHrReboardWorkHistory());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHrReboardWorkHistory());
    this.store.dispatch(new ClearDocumentHrReboardWorkHistory());
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
