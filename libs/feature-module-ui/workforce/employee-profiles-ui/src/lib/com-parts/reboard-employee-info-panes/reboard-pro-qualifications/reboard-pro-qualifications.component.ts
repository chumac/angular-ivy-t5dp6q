
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IProfessionalQualification } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { APPROVAL_STATUS } from '@nutela/shared/app-global';
import { ReboardProQualificationsEditorComponent } from './reboard-pro-qualifications-editor/reboard-pro-qualifications-editor.component';
import { ReboardProQualificationsViewerComponent } from './reboard-pro-qualifications-viewer/reboard-pro-qualifications-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData, LoadInstitutions, getCourses, LoadCourses, getProfessionalQualifications, LoadProfessionalInstitutions } from '@nutela/store/modules/foundation';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { DialogService } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { showEditorReboardProfessionalQualifications, LoadDataReboardProfessionalQualifications, showViewerReboardProfessionalQualifications, getReboardProfessionalQualificationsDocument, ShowEditorReboardProfessionalQualifications, ShowViewerReboardProfessionalQualifications, LoadDocumentReboardProfessionalQualifications, LoadInlineDocumentReboardProfessionalQualifications, HideEditorReboardProfessionalQualifications, HideViewerReboardProfessionalQualifications, getReboardProfessionalQualificationsData, ClearDocumentReboardProfessionalQualifications, DeleteDataReboardProfessionalQualifications, getReboardProfessionalQualificationsGridData } from '../../../store/my-reboard-data';

@Component({
  selector: 'x365-fm-workforce-reboard-pro-qualifications',
  templateUrl: './reboard-pro-qualifications.component.html',
  styleUrls: ['./reboard-pro-qualifications.component.scss']
})
export class ReboardProQualificationsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;
  institutions$: Observable<ISelectOption[]>;
  courses$: Observable<ISelectOption[]>;

  public data: any[];
  @Input() reboardMode: number;

  professionalQualificationGridData$: Observable<IProfessionalQualification[]>;
  professionalQualificationData$: Observable<IProfessionalQualification[]>;

  approvedData$: Observable<IProfessionalQualification[]>;
  awaitingApprovalData$: Observable<IProfessionalQualification[]>;
  documentData$: Observable<any>;
  inlineDocumentData$: Observable<any>;

  inlineDocumentDataSubscription: Subscription = null;

  @ViewChild('editor') editor: ReboardProQualificationsEditorComponent;
  @ViewChild('viewer') viewer: ReboardProQualificationsViewerComponent;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
    // this.getGridData();
    // this.pushApprovedDataToStore();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataReboardProfessionalQualifications());
    this.store.dispatch(new LoadInstitutions());
    this.store.dispatch(new LoadProfessionalInstitutions());
    this.store.dispatch(new LoadCourses());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorReboardProfessionalQualifications));
    this.showViewer$ = this.store.pipe(select(showViewerReboardProfessionalQualifications));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.institutions$ = this.store.pipe(select(getProfessionalQualifications));
    this.courses$ = this.store.pipe(select(getCourses));
    this.professionalQualificationGridData$ = this.store.pipe(select(getReboardProfessionalQualificationsGridData));
    this.professionalQualificationData$ = this.store.pipe(select(getReboardProfessionalQualificationsData));
    this.documentData$ = this.store.pipe(select(getReboardProfessionalQualificationsDocument));
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
      this.store.dispatch(new ShowEditorReboardProfessionalQualifications());
    })
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentReboardProfessionalQualifications({recordId: rowId, isApproved: true}));
          }

          this.store.dispatch(new ShowViewerReboardProfessionalQualifications());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteDataReboardProfessionalQualifications({ recordId: rowId }));
      }
    });
  }

  onDownloadIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentReboardProfessionalQualifications({recordId: rowId, isApproved: true}));
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
    this.store.dispatch(new HideEditorReboardProfessionalQualifications());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReboardProfessionalQualifications());
    this.store.dispatch(new ClearDocumentReboardProfessionalQualifications());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
