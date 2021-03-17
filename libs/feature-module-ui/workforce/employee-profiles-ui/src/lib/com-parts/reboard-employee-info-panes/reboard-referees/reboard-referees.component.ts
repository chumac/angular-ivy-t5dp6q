
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IReferee } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { ReboardRefereesEditorComponent } from './reboard-referees-editor/reboard-referees-editor.component';
import { ReboardRefereesViewerComponent } from './reboard-referees-viewer/reboard-referees-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { DialogService } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { LoadDataReboardReferee, showEditorReboardReferee, showViewerReboardReferee, getReboardRefereeData, getReboardRefereeDocument, ShowEditorReboardReferee, LoadDocumentReboardReferee, LoadPhotoReboardReferee, getReboardRefereePhoto, ShowViewerReboardReferee, LoadInlineDocumentReboardReferee, HideEditorReboardReferee, HideViewerReboardReferee, ClearDocumentReboardReferee, ClearViewerPhotoReboardReferee, DeleteDataReboardReferee } from '../../../store/my-reboard-data';

@Component({
  selector: 'x365-fm-workforce-reboard-referees',
  templateUrl: './reboard-referees.component.html',
  styleUrls: ['./reboard-referees.component.scss']
})
export class ReboardRefereesComponent implements OnInit {

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  selectOptionData$: Observable<ISelectOptionData>;
  institutions$: Observable<ISelectOption[]>;
  courses$: Observable<ISelectOption[]>;
  refereeData$: Observable<IReferee[]>;
  documentData$: Observable<any>;
  inlineDocumentData$: Observable<any>;
  imageData$: Observable<any>;

  public data: any[];
  @Input() reboardMode: number;

  inlineDocumentDataSubscription: Subscription = null;

  @ViewChild('editor') editor: ReboardRefereesEditorComponent;
  @ViewChild('viewer') viewer: ReboardRefereesViewerComponent;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
    // this.getGridData();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataReboardReferee());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorReboardReferee));
    this.showViewer$ = this.store.pipe(select(showViewerReboardReferee));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.refereeData$ = this.store.pipe(select(getReboardRefereeData));
    this.documentData$ = this.store.pipe(select(getReboardRefereeDocument));
  }

  getRowData$(rowId: number): Observable<IReferee> {
    return this.refereeData$.pipe(
      map(d => d.filter(v => v.ref_id === rowId)),
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
          this.store.dispatch(new ShowEditorReboardReferee());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url_document !== '') {
            this.store.dispatch(new LoadDocumentReboardReferee({recordId: rowId, isApproved:true}));
          }

          this.store.dispatch(new LoadPhotoReboardReferee({recordId: rowId}));
          this.imageData$ = this.store.pipe(select(getReboardRefereePhoto));
          this.store.dispatch(new ShowViewerReboardReferee());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteDataReboardReferee({recordId: rowId}));
      }
    });
  }

  onDownloadIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url_document === null || result.img_url_document === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentReboardReferee({recordId: rowId, isApproved:true}));
          }
        }
      );
  }

  hasDocumentApproved(rowId: number):boolean {
    let status = false;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url_document !== null || result.img_url_document === '') {
            status = true;
          } else {
            status = false;
          }
        }
      );

    return status;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorReboardReferee());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReboardReferee());
    this.store.dispatch(new ClearDocumentReboardReferee());
    this.store.dispatch(new ClearViewerPhotoReboardReferee());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
