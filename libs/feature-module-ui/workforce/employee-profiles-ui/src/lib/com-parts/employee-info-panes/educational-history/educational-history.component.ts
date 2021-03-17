
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { getEducationData, ShowEditorEducation, HideEditorEducation, HideViewerEducation, LoadInlineDocumentEducation, RemoveAwaitingApprovalDataEducation, DeleteApprovedDataEducation, ShowViewerEducation, LoadDocumentEducation, LoadAwaitingApprovalDataEducationSuccess, LoadApprovedDataEducationSuccess, showEditorEducation, showViewerEducation, getEducationApprovedData, getEducationAwaitingApprovalData, getEducationDocument, LoadApprovedDataItemEducation, ClearApprovedDataMapEducation, getEducationApprovedDataMap, LoadDataEducation, DeleteAwaitingApprovalDataEducation, getEducationCountryList, LoadCountryListEducation } from '@nutela/store/modules/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';
import { IEducation } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { APPROVAL_STATUS } from '@nutela/shared/app-global';
import { EducationalHistoryEditorComponent } from './educational-history-editor/educational-history-editor.component';
import { EducationalHistoryViewerComponent } from './educational-history-viewer/educational-history-viewer.component';
import { ISelectOptionData, ISubscriptions } from '@nutela/models/common';
import { getSelectOptionData, LoadInstitutions, getInstitutions, getCourses, LoadCourses, getFaculties, getDepartments, allowDepartmentChoiceList, allowFacultyChoiceList } from '@nutela/store/modules/foundation';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation, UtilService } from '@nutela/core-services';
import { DialogService, DialogBoxMdlsComponent, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';


@Component({
  selector: 'x365-fm-workforce-educational-history',
  templateUrl: './educational-history.component.html',
  styleUrls: ['./educational-history.component.scss']
})
export class EducationalHistoryComponent implements OnInit, OnDestroy {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  private subscriptions: ISubscriptions = {};


  selectOptionData$: Observable<ISelectOptionData>;
  countryList$: Observable<ISelectOption[]>;
  faculties$: Observable<ISelectOption[]>;
  departments$: Observable<ISelectOption[]>;

  institutions$: Observable<ISelectOption[]>;
  courses$: Observable<ISelectOption[]>;

  public data: any[];

  educationData$: Observable<IEducation[]>;

  approvedData$: Observable<IEducation[]>;
  awaitingApprovalData$: Observable<IEducation[]>;
  documentData$: Observable<any>;
  inlineDocumentData$: Observable<any>;
  allowFacultyChoiceList$: Observable<string>;
  allowDepartmentChoiceList$: Observable<string>;


  @ViewChild('editor') editor: EducationalHistoryEditorComponent;
  @ViewChild('viewer') viewer: EducationalHistoryViewerComponent;

  constructor(private store: Store<IAppState>, private utilService: UtilService, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
    this.getGridData();
    this.pushApprovedDataToStore();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataEducation());
    this.store.dispatch(new LoadCountryListEducation());
    this.store.dispatch(new LoadInstitutions());
    this.store.dispatch(new LoadCourses());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorEducation));
    this.showViewer$ = this.store.pipe(select(showViewerEducation));

    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.countryList$ = this.store.pipe(select(getEducationCountryList));
    this.faculties$ = this.store.pipe(select(getFaculties));
    this.departments$ = this.store.pipe(select(getDepartments));

    this.institutions$ = this.store.pipe(select(getInstitutions));
    this.courses$ = this.store.pipe(select(getCourses));

    this.educationData$ = this.store.pipe(select(getEducationData));

    this.approvedData$ = this.store.pipe(select(getEducationApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getEducationAwaitingApprovalData));
    this.documentData$ = this.store.pipe(select(getEducationDocument));

    this.allowFacultyChoiceList$ = this.store.pipe(select(allowFacultyChoiceList));
    this.allowDepartmentChoiceList$ = this.store.pipe(select(allowDepartmentChoiceList));

    // this.allowFacultyChoiceList$ = from(['YES']);
    // this.allowDepartmentChoiceList$ = from(['YES']);

  }

  approvedDataList():Observable<IEducation[]>  {
    return this.educationData$
    .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.approved)));
  }

  awaitingApprovalDataList():Observable<IEducation[]>  {
    return this.educationData$
    .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.queued)));
  }

  pushApprovedDataToStore() {
    this.approvedDataList()
      .subscribe((list: IEducation[]) => {
        list.forEach((data: IEducation) => this.store.dispatch(new LoadApprovedDataItemEducation({recordId: data.edu_id})));
      }
    );
  }

  getGridData() {
    this.educationData$
      .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.approved)))
      .subscribe((result) => {
        this.store.dispatch(new LoadApprovedDataEducationSuccess(result));
      }
    );

    this.educationData$
      .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.queued)))
      .subscribe((result) => {
        this.store.dispatch(new LoadAwaitingApprovalDataEducationSuccess(result));
      }
      );
  }

  getRowApprovedData$(rowId: number): Observable<IEducation> {
    return this.educationData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.approved)),
      map(d => d.filter(v => v.edu_id === rowId)),
      map(e => e.shift()))
  }

  getRowAwaitingApprovalData$(rowId: number): Observable<IEducation> {
    return this.educationData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.queued)),
      map(d => d.filter(v => v.edu_id === rowId)),
      map(e => e.shift()))
  }

  getViewRowAwaitingApprovalData$(rowId: number): Observable<IEducation> {
    return this.awaitingApprovalData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.queued)),
      map(d => d.filter(v => v.edu_id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.store.pipe(select(getEducationApprovedDataMap)).pipe(take(1))
      .subscribe((data: {[key: number]: IEducation}) => {
        const item = data[rowId];
        if (item) {
          this.editor.data = item;
          this.editor.reset();
          this.store.dispatch(new ShowEditorEducation());
        }
      })
  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentEducation({recordId: rowId, isApproved: true}));
          }

          this.store.dispatch(new ShowViewerEducation());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getViewRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentEducation({recordId: rowId, isApproved: false}));
          }

          this.store.dispatch(new ShowViewerEducation());
        }
      );
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete your data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteApprovedDataEducation({ recordId: rowId }));
      }
    });
    // this.subscriptions['deleteData'] = this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteApprovedDataEducation({recordId: rowId}));
    //     }
    //   });
  }

  onAwaitingApprovalDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete your data awaiting approval?');

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteAwaitingApprovalDataEducation({ recordId: rowId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteAwaitingApprovalDataEducation({recordId: rowId}));
    //       // this.store.dispatch(new RemoveAwaitingApprovalDataEducation({recordId: rowId}));
    //     }
    //   });
  }

  onApprovedDownloadIconClicked(rowId: number) {
    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentEducation({recordId: rowId, isApproved: true}));
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
            this.store.dispatch(new LoadInlineDocumentEducation({recordId: rowId, isApproved: false}));
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

  onCancelEditor() {
    this.store.dispatch(new HideEditorEducation());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerEducation());
  }

  unsubscribe() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }

  dialogOpen() {
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
