
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { getPersonalRefereeData, getRefereeApprovedData, getRefereeAwaitingApprovalData, getRefereeDocument, LoadAwaitingApprovalDataRefereeSuccess, LoadApprovedDataRefereeSuccess, ShowEditorReferee, LoadDocumentReferee, ShowViewerReferee, DeleteApprovedDataReferee, RemoveAwaitingApprovalDataReferee, LoadInlineDocumentReferee, HideEditorReferee, HideViewerReferee, showEditorReferee, showViewerReferee, LoadApprovedPhotoReferee, getRefereeApprovedPhoto, LoadAwaitingApprovalPhotoReferee, getRefereeAwaitingApprovalPhoto, LoadDataReferee, DeleteAwaitingApprovalDataReferee } from '@nutela/store/modules/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';
import { IReferee } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { APPROVAL_STATUS } from '@nutela/shared/app-global';
import { PersonalRefereesEditorComponent } from './personal-referees-editor/personal-referees-editor.component';
import { PersonalRefereesViewerComponent } from './personal-referees-viewer/personal-referees-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-workforce-personal-referees',
  templateUrl: './personal-referees.component.html',
  styleUrls: ['./personal-referees.component.scss']
})
export class PersonalRefereesComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;
  institutions$: Observable<ISelectOption[]>;
  courses$: Observable<ISelectOption[]>;

  public data: any[];

  personalRefereeData$: Observable<IReferee[]>;

  approvedData$: Observable<IReferee[]>;
  awaitingApprovalData$: Observable<IReferee[]>;
  documentData$: Observable<any>;
  inlineDocumentData$: Observable<any>;

  inlineDocumentDataSubscription: Subscription = null;
  imageData$: Observable<any>;

  @ViewChild('editor') editor: PersonalRefereesEditorComponent;
  @ViewChild('viewer') viewer: PersonalRefereesViewerComponent;

  constructor(private store: Store<IAppState>, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
    this.getGridData();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataReferee());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorReferee));
    this.showViewer$ = this.store.pipe(select(showViewerReferee));

    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));

    this.personalRefereeData$ = this.store.pipe(select(getPersonalRefereeData));

    this.approvedData$ = this.store.pipe(select(getRefereeApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getRefereeAwaitingApprovalData));
    this.documentData$ = this.store.pipe(select(getRefereeDocument));
  }

  getGridData() {
    this.personalRefereeData$
      .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.approved)))
        .subscribe((result) => {
            this.store.dispatch(new LoadApprovedDataRefereeSuccess(result));
          }
        );

    this.personalRefereeData$
      .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.queued)))
        .subscribe((result) => {
            this.store.dispatch(new LoadAwaitingApprovalDataRefereeSuccess(result));
          }
        );
  }

  getRowApprovedData$(rowId: number): Observable<IReferee> {
    return this.personalRefereeData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.approved)),
      map(d => d.filter(v => v.ref_id === rowId)),
      map(e => e.shift()))
  }

  getRowAwaitingApprovalData$(rowId: number): Observable<IReferee> {
    return this.personalRefereeData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.queued)),
      map(d => d.filter(v => v.ref_id === rowId)),
      map(e => e.shift()))
  }

  getViewRowAwaitingApprovalData$(rowId: number): Observable<IReferee> {
    return this.awaitingApprovalData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.queued)),
      map(d => d.filter(v => v.ref_id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorReferee());
        }
      );
  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url_document !== '') {
            this.store.dispatch(new LoadDocumentReferee({recordId: rowId, isApproved:true}));
          }

          this.store.dispatch(new LoadApprovedPhotoReferee({recordId: rowId}));
          this.imageData$ = this.store.pipe(select(getRefereeApprovedPhoto));
          this.store.dispatch(new ShowViewerReferee());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getViewRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url_document !== '') {
            this.store.dispatch(new LoadDocumentReferee({recordId: rowId, isApproved:false}));
          }
          this.store.dispatch(new LoadAwaitingApprovalPhotoReferee({recordId: rowId}));
          this.imageData$ = this.store.pipe(select(getRefereeAwaitingApprovalPhoto));

          this.store.dispatch(new ShowViewerReferee());
        }
      );
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteApprovedDataReferee({recordId: rowId}));
        }
      });
  }

  onAwaitingApprovalDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteAwaitingApprovalDataReferee({recordId: rowId}));
        }
      });
  }

  onApprovedDownloadIconClicked(rowId: number) {
    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url_document === null || result.img_url_document === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentReferee({recordId: rowId, isApproved:true}));
          }
        }
      );
  }

  onAwaitingApprovalDownloadIconClicked(rowId: number) {
    this.getViewRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url_document === null || result.img_url_document === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentReferee({recordId: rowId, isApproved:false}));
          }
        }
      );
  }

  hasDocumentApproved(rowId: number):boolean {
    let status = false;

    this.getRowApprovedData$(rowId).pipe(take(1))
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

  showEditor() {
    this.editor.data = null;
    this.store.dispatch(new ShowEditorReferee());
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorReferee());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReferee());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
