
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IReferee } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { HrReboardRefereesEditorComponent } from './hr-reboard-referees-editor/hr-reboard-referees-editor.component';
import { HrReboardRefereesViewerComponent } from './hr-reboard-referees-viewer/hr-reboard-referees-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { LoadDataHrReboardReferee, showEditorHrReboardReferee, showViewerHrReboardReferee, getHrReboardRefereeData, getHrReboardRefereeDocument, ShowEditorHrReboardReferee, LoadDocumentHrReboardReferee, LoadPhotoHrReboardReferee, getHrReboardRefereePhoto, ShowViewerHrReboardReferee, LoadInlineDocumentHrReboardReferee, HideEditorHrReboardReferee, HideViewerHrReboardReferee, ClearDocumentHrReboardReferee, ClearViewerPhotoHrReboardReferee, DeleteDataHrReboardReferee } from '../../../store/hr-reboard-data';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-referees',
  templateUrl: './hr-reboard-referees.component.html',
  styleUrls: ['./hr-reboard-referees.component.scss']
})
export class HrReboardRefereesComponent implements OnInit {

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
  @Input() employeeId: number;

  inlineDocumentDataSubscription: Subscription = null;

  @ViewChild('editor') editor: HrReboardRefereesEditorComponent;
  @ViewChild('viewer') viewer: HrReboardRefereesViewerComponent;

  constructor(private store: Store<IAppState>, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
    // this.getGridData();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataHrReboardReferee({ employeeId: this.employeeId}));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorHrReboardReferee));
    this.showViewer$ = this.store.pipe(select(showViewerHrReboardReferee));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.refereeData$ = this.store.pipe(select(getHrReboardRefereeData));
    this.documentData$ = this.store.pipe(select(getHrReboardRefereeDocument));
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
          this.store.dispatch(new ShowEditorHrReboardReferee());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url_document !== '') {
            this.store.dispatch(new LoadDocumentHrReboardReferee({recordId: rowId, employeeId: this.employeeId}));
          }

          this.store.dispatch(new LoadPhotoHrReboardReferee({recordId: rowId, employeeId: this.employeeId}));
          this.imageData$ = this.store.pipe(select(getHrReboardRefereePhoto));
          this.store.dispatch(new ShowViewerHrReboardReferee());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataHrReboardReferee({ recordId: rowId, employeeId: this.employeeId }));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url_document === null || result.img_url_document === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentHrReboardReferee({recordId: rowId, employeeId: this.employeeId}));
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
    this.store.dispatch(new HideEditorHrReboardReferee());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHrReboardReferee());
    this.store.dispatch(new ClearDocumentHrReboardReferee());
    this.store.dispatch(new ClearViewerPhotoHrReboardReferee());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
