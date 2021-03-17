import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IPreviousEmployer } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { ReboardWorkHistoryEditorComponent } from './reboard-work-history-editor/reboard-work-history-editor.component';
import { ReboardWorkHistoryViewerComponent } from './reboard-work-history-viewer/reboard-work-history-viewer.component';
import { ISelectOptionData, ISubscriptions } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation, UtilService } from '@nutela/core-services';
import { DialogService } from '@nutela/shared/ui';
import { showEditorReboardWorkHistory, showViewerReboardWorkHistory, getReboardWorkHistoryData, getReboardWorkHistoryDocument, LoadDataReboardWorkHistory, ShowEditorReboardWorkHistory, LoadDocumentReboardWorkHistory, ShowViewerReboardWorkHistory, LoadInlineDocumentReboardWorkHistory, HideEditorReboardWorkHistory, HideViewerReboardWorkHistory, ClearDocumentReboardWorkHistory, DeleteDataReboardWorkHistory } from '../../../store/my-reboard-data';

@Component({
  selector: 'x365-fm-workforce-reboard-work-history',
  templateUrl: './reboard-work-history.component.html',
  styleUrls: ['./reboard-work-history.component.scss']
})
export class ReboardWorkHistoryComponent implements OnInit, OnDestroy {

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  selectOptionData$: Observable<ISelectOptionData>;
  previousEmployerData$: Observable<IPreviousEmployer[]>;
  documentData$: Observable<any>;

  private subscriptions: ISubscriptions = {};
  public data: any[];
  @Input() public reboardMode: number;

  @ViewChild('editor') editor: ReboardWorkHistoryEditorComponent;
  @ViewChild('viewer') viewer: ReboardWorkHistoryViewerComponent;

  constructor(private utilService: UtilService, private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorReboardWorkHistory));
    this.showViewer$ = this.store.pipe(select(showViewerReboardWorkHistory));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.previousEmployerData$ = this.store.pipe(select(getReboardWorkHistoryData));
    this.documentData$ = this.store.pipe(select(getReboardWorkHistoryDocument));
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataReboardWorkHistory());
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
          this.store.dispatch(new ShowEditorReboardWorkHistory());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentReboardWorkHistory({recordId: rowId, isApproved: true}));
          }

          this.store.dispatch(new ShowViewerReboardWorkHistory());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteDataReboardWorkHistory({ recordId: rowId }));
      }
    });
  }

  onDownloadIconClicked(rowId: number) {
    this.subscriptions['approvedDownload'] = this.getRowData$(rowId)
    .pipe(take(1)).subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentReboardWorkHistory({recordId: rowId, isApproved: true}));
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
    this.store.dispatch(new HideEditorReboardWorkHistory());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReboardWorkHistory());
    this.store.dispatch(new ClearDocumentReboardWorkHistory());
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
