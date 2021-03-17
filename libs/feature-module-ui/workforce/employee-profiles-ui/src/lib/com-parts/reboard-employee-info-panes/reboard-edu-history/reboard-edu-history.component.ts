
import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IEducation } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { ReboardEduHistoryEditorComponent } from './reboard-edu-history-editor/reboard-edu-history-editor.component';
import { ReboardEduHistoryViewerComponent } from './reboard-edu-history-viewer/reboard-edu-history-viewer.component';
import { ISelectOptionData, ISubscriptions } from '@nutela/models/common';
import { getSelectOptionData, LoadInstitutions, getInstitutions, getCourses, LoadCourses, getFaculties, getDepartments, allowDepartmentChoiceList, allowFacultyChoiceList } from '@nutela/store/modules/foundation';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation, UtilService } from '@nutela/core-services';
import { DialogService } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { showEditorReboardEducation, showViewerReboardEducation, getReboardEducationCountryList, getReboardEducationDocument, getReboardEducationData, LoadDataReboardEducation, ShowEditorReboardEducation, LoadDocumentReboardEducation, ShowViewerReboardEducation, LoadInlineDocumentReboardEducation, HideEditorReboardEducation, HideViewerReboardEducation, LoadCountryListReboardEducation, ClearDocumentReboardEducation, DeleteDataReboardEducation, getReboardEducationDataMap, LoadDataItemReboardEducation, LoadDocumentReboardEducationSuccess } from '../../../store/my-reboard-data';


@Component({
  selector: 'x365-fm-workforce-reboard-edu-history',
  templateUrl: './reboard-edu-history.component.html',
  styleUrls: ['./reboard-edu-history.component.scss']
})
export class ReboardEduHistoryComponent implements OnInit, OnDestroy {

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  selectOptionData$: Observable<ISelectOptionData>;
  countryList$: Observable<ISelectOption[]>;
  faculties$: Observable<ISelectOption[]>;
  departments$: Observable<ISelectOption[]>;
  institutions$: Observable<ISelectOption[]>;
  courses$: Observable<ISelectOption[]>;
  educationData$: Observable<IEducation[]>;
  documentData$: Observable<any>;
  inlineDocumentData$: Observable<any>;
  allowFacultyChoiceList$: Observable<string>;
  allowDepartmentChoiceList$: Observable<string>;

  private subscriptions: ISubscriptions = {};

  public data: any[];
  @Input() reboardMode: number;

  @ViewChild('editor') editor: ReboardEduHistoryEditorComponent;
  @ViewChild('viewer') viewer: ReboardEduHistoryViewerComponent;

  constructor(private store: Store<IAppState>, private utilService: UtilService, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    // this.sendSingleRecordToStore();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataReboardEducation());
    this.store.dispatch(new LoadCountryListReboardEducation());
    this.store.dispatch(new LoadInstitutions());
    this.store.dispatch(new LoadCourses());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorReboardEducation));
    this.showViewer$ = this.store.pipe(select(showViewerReboardEducation));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.countryList$ = this.store.pipe(select(getReboardEducationCountryList));
    this.faculties$ = this.store.pipe(select(getFaculties));
    this.departments$ = this.store.pipe(select(getDepartments));
    this.institutions$ = this.store.pipe(select(getInstitutions));
    this.courses$ = this.store.pipe(select(getCourses));
    this.educationData$ = this.store.pipe(select(getReboardEducationData));
    this.documentData$ = this.store.pipe(select(getReboardEducationDocument));
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

  // sendSingleRecordToStore() {
  //   this.educationData$
  //     .subscribe((list: IEducation[]) => {
  //       list.forEach((data: IEducation) => this.store.dispatch(new LoadDataItemReboardEducation({ recordId: data.edu_id })));
  //     }
  //     );
  // }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.store.pipe(select(getReboardEducationDataMap)).pipe(take(1))
      .subscribe((data: { [key: number]: IEducation }) => {
        const item = data[rowId];
        if (item) {
          this.editor.data = item;
          this.editor.reset();
          this.store.dispatch(new ShowEditorReboardEducation());
        }
      })
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
        if (result.img_url !== '') {
          this.store.dispatch(new LoadDocumentReboardEducation({ recordId: rowId, isApproved: true }));
          this.store.dispatch(new ShowViewerReboardEducation());
        }
        this.store.dispatch(new ShowViewerReboardEducation());
      });
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete your data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteDataReboardEducation({ recordId: rowId }));
      }
    });
  }

  onDownloadIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentReboardEducation({recordId: rowId, isApproved: true}));
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
    this.store.dispatch(new HideEditorReboardEducation());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReboardEducation());
    this.store.dispatch(new ClearDocumentReboardEducation());
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
