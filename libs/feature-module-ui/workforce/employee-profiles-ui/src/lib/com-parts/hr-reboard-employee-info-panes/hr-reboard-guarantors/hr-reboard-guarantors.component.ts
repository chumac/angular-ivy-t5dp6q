
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IGuarantor, IBasicOrganisation } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { HrReboardGuarantorsEditorComponent } from './hr-reboard-guarantors-editor/hr-reboard-guarantors-editor.component';
import { HrReboardGuarantorsViewerComponent } from './hr-reboard-guarantors-viewer/hr-reboard-guarantors-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData, getOrganisations, allowOrganisationChoiceList } from '@nutela/store/modules/foundation';
import { DialogService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { ISelectOption } from '@nutela/models/core-data';
import { showEditorHrReboardGuarantor, showViewerHrReboardGuarantor, ShowEditorHrReboardGuarantor, LoadInlineDocumentHrReboardGuarantor, ShowViewerHrReboardGuarantor, HideEditorHrReboardGuarantor, HideViewerHrReboardGuarantor, LoadPhotoHrReboardGuarantor, getHrReboardGuarantorData, LoadDataHrReboardGuarantor, ClearDocumentHrReboardGuarantor, ClearViewerPhotoHrReboardGuarantor, getHrReboardGuarantorPhoto, getHrReboardGuarantorInlineDocument, DeleteDataHrReboardGuarantor } from '../../../store/hr-reboard-data';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-guarantors',
  templateUrl: './hr-reboard-guarantors.component.html',
  styleUrls: ['./hr-reboard-guarantors.component.scss']
})
export class HrReboardGuarantorsComponent implements OnInit {

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  guarantorData$: Observable<IGuarantor[]>;
  awaitingApprovalData$: Observable<IGuarantor[]>;
  documentData$: Observable<any>;
  imageData$: Observable<any>;
  organisations$: Observable<IBasicOrganisation[]>;
  orgAddress$: Observable<ISelectOption[]>;
  useApprovedOrgs$: Observable<string>;
  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];
  @Input() reboardMode: number;
  @Input() employeeId: number;

  @ViewChild('editor') editor: HrReboardGuarantorsEditorComponent;
  @ViewChild('viewer') viewer: HrReboardGuarantorsViewerComponent;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorHrReboardGuarantor));
    this.showViewer$ = this.store.pipe(select(showViewerHrReboardGuarantor));
    this.guarantorData$ = this.store.pipe(select(getHrReboardGuarantorData));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.organisations$ = this.store.pipe(select(getOrganisations));
    this.useApprovedOrgs$ = this.store.pipe(select(allowOrganisationChoiceList));

  }

  storeDispatches() {
    this.store.dispatch(new LoadDataHrReboardGuarantor({ employeeId: this.employeeId }));
  }

  getRowData$(rowId: number): Observable<IGuarantor> {
    return this.guarantorData$.pipe(
      map(d => d.filter(v => v.guarantor_id === rowId)),
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
          this.store.dispatch(new ShowEditorHrReboardGuarantor());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          this.store.dispatch(new LoadPhotoHrReboardGuarantor({recordId: rowId}));
          this.imageData$ = this.store.pipe(select(getHrReboardGuarantorPhoto));

          this.store.dispatch(new LoadInlineDocumentHrReboardGuarantor({recordId: rowId, isApproved: true}));
          this.documentData$ = this.store.pipe(select(getHrReboardGuarantorInlineDocument));

          this.store.dispatch(new ShowViewerHrReboardGuarantor());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteDataHrReboardGuarantor({ guarantorId: rowId, employeeId: this.employeeId }));
      }
    });
  }

  onDownloadIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.attach_document === null || result.attach_document === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentHrReboardGuarantor({recordId: rowId, isApproved: true}));
          }
        }
      );
  }

  hasDocumentApproved(rowId: number):boolean {
    let status = false;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.attach_document !== null || result.attach_document === '') {
            status = true;
          } else {
            status = false;
          }
        }
      );

    return status;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorHrReboardGuarantor());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHrReboardGuarantor());
    this.store.dispatch(new ClearDocumentHrReboardGuarantor());
    this.store.dispatch(new ClearViewerPhotoHrReboardGuarantor());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
