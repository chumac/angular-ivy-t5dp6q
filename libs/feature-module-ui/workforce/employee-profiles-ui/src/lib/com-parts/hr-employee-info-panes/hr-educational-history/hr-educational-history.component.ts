import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { IEducation } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData, LoadInstitutions, getInstitutions, getCourses, LoadCourses, getFaculties, getDepartments, allowFacultyChoiceList, allowDepartmentChoiceList } from '@nutela/store/modules/foundation';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { HrEducationalHistoryEditorComponent } from './hr-educational-history-editor/hr-educational-history-editor.component';
import { HrEducationalHistoryViewerComponent } from './hr-educational-history-viewer/hr-educational-history-viewer.component';
import { ActivatedRoute } from '@angular/router';
import { IEmployeesProfileState } from '../../../store/root';
import { LoadApprovedDataEducation, LoadAwaitingApprovalDataEducation, ProcessingEducation,
         showEditorEducation, showViewerEducation, getEducationApprovedData, getEducationAwaitingApprovalData,
         getEducationDocument,ShowEditorEducation, LoadDocumentEducation, ShowViewerEducation, DeleteApprovedDataEducation,
         LoadInlineDocumentEducation, HideEditorEducation, HideViewerEducation, DeleteAwaitingApprovalDataEducation, getEducationCountryList, LoadCountryListEducation, LoadInstitutionsEducation } from '../../../store/employee-detailed-area';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'x365-fm-workforce-hr-educational-history',
  templateUrl: './hr-educational-history.component.html',
  styleUrls: ['./hr-educational-history.component.scss']
})
export class HrEducationalHistoryComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  view:boolean=false;

  institutions$: Observable<ISelectOption[]>;
  faculties$: Observable<ISelectOption[]>;
  department$: Observable<ISelectOption[]>;
  courses$: Observable<ISelectOption[]>;
  countryList$: Observable<ISelectOption[]>;
  selectOptionData$: Observable<ISelectOptionData>;

  allowFacultyChoiceList$: Observable<string>;
  allowDepartmentChoiceList$: Observable<string>;

  public data: any[];
  @Input() employeeId:number;

  educationData$: Observable<IEducation[]>;

  approvedData$: Observable<IEducation[]>;
  awaitingApprovalData$: Observable<IEducation[]>;
  documentData$: Observable<any>;
  inlineDocumentData$: Observable<any>;

  @ViewChild('editor') editor: HrEducationalHistoryEditorComponent;
  @ViewChild('viewer') viewer: HrEducationalHistoryViewerComponent;

  constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,private store: Store<IEmployeesProfileState>,
              private dialogService: DialogService) {
                titleService.setTitle(
                  `${'HR Educational History'}${this.partialDocumentTitle}`
                );
              }


  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadInstitutions());
    this.store.dispatch(new LoadCountryListEducation());
    this.store.dispatch(new LoadCourses());

    this.store.dispatch(new LoadApprovedDataEducation({employeeId:this.employeeId}));
    this.store.dispatch(new LoadAwaitingApprovalDataEducation({employeeId:this.employeeId}));
    this.store.dispatch(new ProcessingEducation());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorEducation));
    this.showViewer$ = this.store.pipe(select(showViewerEducation));

    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.institutions$ = this.store.pipe(select(getInstitutions));
    this.faculties$=this.store.pipe(select(getFaculties));
    this.department$=this.store.pipe(select(getDepartments));
    this.courses$ = this.store.pipe(select(getCourses));
    this.countryList$ = this.store.pipe(select(getEducationCountryList));

    this.allowFacultyChoiceList$ = this.store.pipe(select(allowFacultyChoiceList));
    this.allowDepartmentChoiceList$ = this.store.pipe(select(allowDepartmentChoiceList));


    this.approvedData$ = this.store.pipe(select(getEducationApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getEducationAwaitingApprovalData));
    this.documentData$ = this.store.pipe(select(getEducationDocument));
  }

  getApprovedData$(rowId: number): Observable<IEducation> {
    return this.approvedData$.pipe(
      map(d => d.filter(v => v.edu_id === rowId)),
      map(e => e.shift()))
  }

  getAwaitingApprovalData$(rowId: number): Observable<IEducation> {
    return this.awaitingApprovalData$.pipe(
      map(d => d.filter(v => v.edu_id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(rowId: number) {
      this.editor.data = null;
    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorEducation());
        }
      );
  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.view=true;
    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentEducation({recordId: rowId, employeeId: result.employee_id, isApproved: true}));
          }

          this.store.dispatch(new ShowViewerEducation());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.view=false;
    this.getAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentEducation({recordId: rowId, employeeId: result.employee_id, isApproved: false}));
          }

          this.store.dispatch(new ShowViewerEducation());
        }
      );
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteApprovedDataEducation({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteApprovedDataEducation({recordId: rowId,employeeId:this.employeeId}));
    //     }
    //   });
  }

  onAwaitingApprovalDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteAwaitingApprovalDataEducation({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteAwaitingApprovalDataEducation({recordId: rowId,employeeId:this.employeeId}));
    //     }
    //   });
  }

  onApprovedDownloadIconClicked(rowId: number) {
    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentEducation({recordId: rowId, employeeId: result.employee_id, isApproved: true}));
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
            this.store.dispatch(new LoadInlineDocumentEducation({recordId: rowId, employeeId: result.employee_id, isApproved: false}));
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
    this.store.dispatch(new ShowEditorEducation());
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorEducation());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerEducation());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
