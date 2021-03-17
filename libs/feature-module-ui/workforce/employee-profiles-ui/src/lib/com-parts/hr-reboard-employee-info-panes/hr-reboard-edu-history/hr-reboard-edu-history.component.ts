
import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IEducation } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { HrReboardEduHistoryEditorComponent } from './hr-reboard-edu-history-editor/hr-reboard-edu-history-editor.component';
import { HrReboardEduHistoryViewerComponent } from './hr-reboard-edu-history-viewer/hr-reboard-edu-history-viewer.component';
import { ISelectOptionData, ISubscriptions } from '@nutela/models/common';
import { getSelectOptionData, LoadInstitutions, getInstitutions, getCourses, LoadCourses, getFaculties, getDepartments, allowDepartmentChoiceList, allowFacultyChoiceList } from '@nutela/store/modules/foundation';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation, UtilService } from '@nutela/core-services';
import { DialogService } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { showEditorHrReboardEducation, showViewerHrReboardEducation, getHrReboardEducationCountryList, getHrReboardEducationDocument, getHrReboardEducationData, LoadDataHrReboardEducation, ShowEditorHrReboardEducation, LoadDocumentHrReboardEducation, ShowViewerHrReboardEducation, LoadInlineDocumentHrReboardEducation, HideEditorHrReboardEducation, HideViewerHrReboardEducation, LoadCountryListHrReboardEducation, ClearDocumentHrReboardEducation, DeleteDataHrReboardEducation } from '../../../store/hr-reboard-data';


@Component({
  selector: 'x365-fm-workforce-hr-reboard-edu-history',
  templateUrl: './hr-reboard-edu-history.component.html',
  styleUrls: ['./hr-reboard-edu-history.component.scss']
})
export class HrReboardEduHistoryComponent implements OnInit, OnDestroy {

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  selectOptionData$: Observable<ISelectOptionData>;
  countryList$: Observable<ISelectOption[]>;
  faculties$: Observable<ISelectOption[]>;
  departments$: Observable<ISelectOption[]>;
  institutions$: Observable<ISelectOption[]>;
  courses$: Observable<ISelectOption[]>;
  educationData$: Observable<IEducation[]>;
  approvedData$: Observable<IEducation[]>;
  awaitingApprovalData$: Observable<IEducation[]>;
  documentData$: Observable<any>;
  inlineDocumentData$: Observable<any>;
  allowFacultyChoiceList$: Observable<string>;
  allowDepartmentChoiceList$: Observable<string>;

  private subscriptions: ISubscriptions = {};

  public data: any[];
  @Input() reboardMode: number;
  @Input() employeeId: number;

  @ViewChild('editor') editor: HrReboardEduHistoryEditorComponent;
  @ViewChild('viewer') viewer: HrReboardEduHistoryViewerComponent;

  constructor(private store: Store<IAppState>, private utilService: UtilService, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
    // this.getGridData();
    // this.pushApprovedDataToStore();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataHrReboardEducation({ employeeId: this.employeeId}));
    this.store.dispatch(new LoadCountryListHrReboardEducation());
    this.store.dispatch(new LoadInstitutions());
    this.store.dispatch(new LoadCourses());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorHrReboardEducation));
    this.showViewer$ = this.store.pipe(select(showViewerHrReboardEducation));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.countryList$ = this.store.pipe(select(getHrReboardEducationCountryList));
    this.faculties$ = this.store.pipe(select(getFaculties));
    this.departments$ = this.store.pipe(select(getDepartments));
    this.institutions$ = this.store.pipe(select(getInstitutions));
    this.courses$ = this.store.pipe(select(getCourses));
    this.educationData$ = this.store.pipe(select(getHrReboardEducationData));
    this.documentData$ = this.store.pipe(select(getHrReboardEducationDocument));
    this.allowFacultyChoiceList$ = this.store.pipe(select(allowFacultyChoiceList));
    this.allowDepartmentChoiceList$ = this.store.pipe(select(allowDepartmentChoiceList));
  }

  getRowData$(rowId: number): Observable<IEducation> {
    return this.educationData$.pipe(
      map(d => d.filter(v => v.edu_id === rowId)),
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
    this.getRowData$(rowId).pipe(take(1)).subscribe(edu => {
      this.editor.data = edu;
      this.editor.reset();
      this.store.dispatch(new ShowEditorHrReboardEducation());
    })
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentHrReboardEducation({recordId: rowId, isApproved: true}));
          }

          this.store.dispatch(new ShowViewerHrReboardEducation());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete your data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteDataHrReboardEducation({ educationId: rowId, employeeId: this.employeeId }));
      }
    });
  }

  onDownloadIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentHrReboardEducation({recordId: rowId, isApproved: true}));
          }
        }
      );
  }

  hasDocumentApproved(rowId: number):boolean {
    let status = false;

    this.getRowData$(rowId).pipe(take(1))
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
    this.store.dispatch(new HideEditorHrReboardEducation());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHrReboardEducation());
    this.store.dispatch(new ClearDocumentHrReboardEducation());
  }

  unsubscribe() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }

  dialogOpen() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
