
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { getProfessionalQualificationData, getProfessionalQualificationsApprovedData, getProfessionalQualificationsAwaitingApprovalData, getProfessionalQualificationsDocument, LoadAwaitingApprovalDataProfessionalQualificationsSuccess, LoadApprovedDataProfessionalQualificationsSuccess, ShowEditorProfessionalQualifications, LoadDocumentProfessionalQualifications, ShowViewerProfessionalQualifications, DeleteApprovedDataProfessionalQualifications, RemoveAwaitingApprovalDataProfessionalQualifications, LoadInlineDocumentProfessionalQualifications, HideEditorProfessionalQualifications, HideViewerProfessionalQualifications, showEditorProfessionalQualifications, showViewerProfessionalQualifications, LoadApprovedDataItemProfessionalQualifications, getProfessionalQualificationsApprovedDataMap, LoadDataProfessionalQualifications, DeleteAwaitingApprovalDataProfessionalQualifications } from '@nutela/store/modules/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';
import { IProfessionalQualification } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { APPROVAL_STATUS } from '@nutela/shared/app-global';
import { ProfessionalQualificationsEditorComponent } from './professional-qualifications-editor/professional-qualifications-editor.component';
import { ProfessionalQualificationsViewerComponent } from './professional-qualifications-viewer/professional-qualifications-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData, LoadInstitutions, getInstitutions, getCourses, LoadCourses, getProfessionalQualifications, LoadProfessionalInstitutions } from '@nutela/store/modules/foundation';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-workforce-professional-qualifications',
  templateUrl: './professional-qualifications.component.html',
  styleUrls: ['./professional-qualifications.component.scss']
})
export class ProfessionalQualificationsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;
  institutions$: Observable<ISelectOption[]>;
  courses$: Observable<ISelectOption[]>;

  public data: any[];

  professionalQualificationData$: Observable<IProfessionalQualification[]>;

  approvedData$: Observable<IProfessionalQualification[]>;
  awaitingApprovalData$: Observable<IProfessionalQualification[]>;
  documentData$: Observable<any>;
  inlineDocumentData$: Observable<any>;

  inlineDocumentDataSubscription: Subscription = null;

  @ViewChild('editor') editor: ProfessionalQualificationsEditorComponent;
  @ViewChild('viewer') viewer: ProfessionalQualificationsViewerComponent;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
    this.getGridData();
    this.pushApprovedDataToStore();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataProfessionalQualifications());
    this.store.dispatch(new LoadInstitutions());
    this.store.dispatch(new LoadProfessionalInstitutions());
    this.store.dispatch(new LoadCourses());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorProfessionalQualifications));
    this.showViewer$ = this.store.pipe(select(showViewerProfessionalQualifications));

    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.institutions$ = this.store.pipe(select(getProfessionalQualifications));
    this.courses$ = this.store.pipe(select(getCourses));

    this.professionalQualificationData$ = this.store.pipe(select(getProfessionalQualificationData));

    this.approvedData$ = this.store.pipe(select(getProfessionalQualificationsApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getProfessionalQualificationsAwaitingApprovalData));
    this.documentData$ = this.store.pipe(select(getProfessionalQualificationsDocument));
  }

  approvedDataList():Observable<IProfessionalQualification[]>  {
    return this.professionalQualificationData$
    .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.approved)));
  }

  awaitingApprovalDataList():Observable<IProfessionalQualification[]>  {
    return this.professionalQualificationData$
    .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.queued)));
  }

  pushApprovedDataToStore() {
    this.approvedDataList()
      .subscribe((list: IProfessionalQualification[]) => {
        list.forEach((data: IProfessionalQualification) => this.store.dispatch(new LoadApprovedDataItemProfessionalQualifications({recordId: data.proqual_id})));
      }
    );
  }

  getGridData() {
    this.professionalQualificationData$
      .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.approved)))
        .subscribe((result) => {
            this.store.dispatch(new LoadApprovedDataProfessionalQualificationsSuccess(result));
          }
        );

    this.professionalQualificationData$
      .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.queued)))
        .subscribe((result) => {
            this.store.dispatch(new LoadAwaitingApprovalDataProfessionalQualificationsSuccess(result));
          }
        );
  }

  getRowApprovedData$(rowId: number): Observable<IProfessionalQualification> {
    return this.professionalQualificationData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.approved)),
      map(d => d.filter(v => v.proqual_id === rowId)),
      map(e => e.shift()))
  }

  getRowAwaitingApprovalData$(rowId: number): Observable<IProfessionalQualification> {
    return this.professionalQualificationData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.queued)),
      map(d => d.filter(v => v.proqual_id === rowId)),
      map(e => e.shift()))
  }

  getViewRowAwaitingApprovalData$(rowId: number): Observable<IProfessionalQualification> {
    return this.awaitingApprovalData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.queued)),
      map(d => d.filter(v => v.proqual_id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.store.pipe(select(getProfessionalQualificationsApprovedDataMap), take(1))
      .subscribe((data: {[key: number]: IProfessionalQualification}) => {
        const item = data[rowId];
        if (item) {
          this.editor.data = item;
          this.editor.reset();
          this.store.dispatch(new ShowEditorProfessionalQualifications());
        }
      })
  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentProfessionalQualifications({recordId: rowId, isApproved: true}));
          }

          this.store.dispatch(new ShowViewerProfessionalQualifications());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getViewRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentProfessionalQualifications({recordId: rowId, isApproved: false}));
          }

          this.store.dispatch(new ShowViewerProfessionalQualifications());
        }
      );
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteApprovedDataProfessionalQualifications({ recordId: rowId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteApprovedDataProfessionalQualifications({recordId: rowId}));
    //     }
    //   });
  }

  onAwaitingApprovalDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteAwaitingApprovalDataProfessionalQualifications({ recordId: rowId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteAwaitingApprovalDataProfessionalQualifications({recordId: rowId}));
    //       // this.store.dispatch(new RemoveAwaitingApprovalDataProfessionalQualifications({recordId: rowId}));
    //     }
    //   });
  }

  onApprovedDownloadIconClicked(rowId: number) {
    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentProfessionalQualifications({recordId: rowId, isApproved: true}));
          }
        }
      );
  }

  onAwaitingApprovalDownloadIconClicked(rowId: number) {
    this.getViewRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentProfessionalQualifications({recordId: rowId, isApproved: false}));
          }
        }
      );
  }

  hasDocumentApproved(rowId: number):boolean {
    let status = false;

    this.getRowApprovedData$(rowId).pipe(take(1))
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
    this.editor.onCancel();
    this.store.dispatch(new ShowEditorProfessionalQualifications());
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorProfessionalQualifications());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerProfessionalQualifications());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
