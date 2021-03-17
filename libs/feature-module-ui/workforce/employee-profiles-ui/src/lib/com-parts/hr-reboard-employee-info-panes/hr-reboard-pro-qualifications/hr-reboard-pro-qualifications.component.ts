
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IProfessionalQualification } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { APPROVAL_STATUS } from '@nutela/shared/app-global';
import { HrReboardProQualificationsEditorComponent } from './hr-reboard-pro-qualifications-editor/hr-reboard-pro-qualifications-editor.component';
import { HrReboardProQualificationsViewerComponent } from './hr-reboard-pro-qualifications-viewer/hr-reboard-pro-qualifications-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData, LoadInstitutions, getCourses, LoadCourses, getProfessionalQualifications, LoadProfessionalInstitutions } from '@nutela/store/modules/foundation';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { DialogService } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { showEditorHrReboardProfessionalQualifications, LoadDataHrReboardProfessionalQualifications, showViewerHrReboardProfessionalQualifications, getHrReboardProfessionalQualificationsDocument, ShowEditorHrReboardProfessionalQualifications, ShowViewerHrReboardProfessionalQualifications, LoadDocumentHrReboardProfessionalQualifications, LoadInlineDocumentHrReboardProfessionalQualifications, HideEditorHrReboardProfessionalQualifications, HideViewerHrReboardProfessionalQualifications, getHrReboardProfessionalQualificationsData, ClearDocumentHrReboardProfessionalQualifications, DeleteDataHrReboardProfessionalQualifications } from '../../../store/hr-reboard-data';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-pro-qualifications',
  templateUrl: './hr-reboard-pro-qualifications.component.html',
  styleUrls: ['./hr-reboard-pro-qualifications.component.scss']
})
export class HrReboardProQualificationsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;
  institutions$: Observable<ISelectOption[]>;
  courses$: Observable<ISelectOption[]>;

  public data: any[];
  @Input() reboardMode: number;
  @Input() employeeId: number;

  professionalQualificationData$: Observable<IProfessionalQualification[]>;

  approvedData$: Observable<IProfessionalQualification[]>;
  awaitingApprovalData$: Observable<IProfessionalQualification[]>;
  documentData$: Observable<any>;
  inlineDocumentData$: Observable<any>;

  inlineDocumentDataSubscription: Subscription = null;

  @ViewChild('editor') editor: HrReboardProQualificationsEditorComponent;
  @ViewChild('viewer') viewer: HrReboardProQualificationsViewerComponent;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
    // this.getGridData();
    // this.pushApprovedDataToStore();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataHrReboardProfessionalQualifications({ employeeId: this.employeeId}));
    this.store.dispatch(new LoadInstitutions());
    this.store.dispatch(new LoadProfessionalInstitutions());
    this.store.dispatch(new LoadCourses());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorHrReboardProfessionalQualifications));
    this.showViewer$ = this.store.pipe(select(showViewerHrReboardProfessionalQualifications));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.institutions$ = this.store.pipe(select(getProfessionalQualifications));
    this.courses$ = this.store.pipe(select(getCourses));
    this.professionalQualificationData$ = this.store.pipe(select(getHrReboardProfessionalQualificationsData));
    this.documentData$ = this.store.pipe(select(getHrReboardProfessionalQualificationsDocument));
  }

  getRowData$(rowId: number): Observable<IProfessionalQualification> {
    return this.professionalQualificationData$.pipe(
      map(d => d.filter(v => v.proqual_id === rowId)),
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

    this.getRowData$(rowId).pipe(take(1)).subscribe(result => {
      this.editor.data = result;
      this.editor.reset();
      this.store.dispatch(new ShowEditorHrReboardProfessionalQualifications());
    })
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentHrReboardProfessionalQualifications({recordId: rowId, isApproved: true}));
          }

          this.store.dispatch(new ShowViewerHrReboardProfessionalQualifications());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteDataHrReboardProfessionalQualifications({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
  }

  onDownloadIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentHrReboardProfessionalQualifications({recordId: rowId, isApproved: true}));
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
    this.store.dispatch(new HideEditorHrReboardProfessionalQualifications());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHrReboardProfessionalQualifications());
    this.store.dispatch(new ClearDocumentHrReboardProfessionalQualifications());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
