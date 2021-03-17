
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IGuarantor, IBasicOrganisation } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { ReboardGuarantorsEditorComponent } from './reboard-guarantors-editor/reboard-guarantors-editor.component';
import { ReboardGuarantorsViewerComponent } from './reboard-guarantors-viewer/reboard-guarantors-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData, getOrganisations, allowOrganisationChoiceList } from '@nutela/store/modules/foundation';
import { DialogService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { ISelectOption } from '@nutela/models/core-data';
import { showEditorReboardGuarantor, showViewerReboardGuarantor, ShowEditorReboardGuarantor, LoadInlineDocumentReboardGuarantor, ShowViewerReboardGuarantor, HideEditorReboardGuarantor, HideViewerReboardGuarantor, LoadPhotoReboardGuarantor, getReboardGuarantorData, LoadDataReboardGuarantor, ClearDocumentReboardGuarantor, ClearViewerPhotoReboardGuarantor, getReboardGuarantorPhoto, getReboardGuarantorInlineDocument, DeleteDataReboardGuarantor } from '../../../store/my-reboard-data';

@Component({
  selector: 'x365-fm-workforce-reboard-guarantors',
  templateUrl: './reboard-guarantors.component.html',
  styleUrls: ['./reboard-guarantors.component.scss']
})
export class ReboardGuarantorsComponent implements OnInit {

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

  @ViewChild('editor') editor: ReboardGuarantorsEditorComponent;
  @ViewChild('viewer') viewer: ReboardGuarantorsViewerComponent;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorReboardGuarantor));
    this.showViewer$ = this.store.pipe(select(showViewerReboardGuarantor));
    this.guarantorData$ = this.store.pipe(select(getReboardGuarantorData));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.organisations$ = this.store.pipe(select(getOrganisations));
    this.useApprovedOrgs$ = this.store.pipe(select(allowOrganisationChoiceList));

  }

  storeDispatches() {
    this.store.dispatch(new LoadDataReboardGuarantor());
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
          this.store.dispatch(new ShowEditorReboardGuarantor());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          this.store.dispatch(new LoadPhotoReboardGuarantor({recordId: rowId}));
          this.imageData$ = this.store.pipe(select(getReboardGuarantorPhoto));

          this.store.dispatch(new LoadInlineDocumentReboardGuarantor({recordId: rowId, isApproved: true}));
          this.documentData$ = this.store.pipe(select(getReboardGuarantorInlineDocument));

          this.store.dispatch(new ShowViewerReboardGuarantor());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteDataReboardGuarantor({ recordId: rowId }));
      }
    });
  }

  onDownloadIconClicked(rowId: number) {
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.attach_document === null || result.attach_document === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentReboardGuarantor({recordId: rowId, isApproved: true}));
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
    this.store.dispatch(new HideEditorReboardGuarantor());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReboardGuarantor());
    this.store.dispatch(new ClearDocumentReboardGuarantor());
    this.store.dispatch(new ClearViewerPhotoReboardGuarantor());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
