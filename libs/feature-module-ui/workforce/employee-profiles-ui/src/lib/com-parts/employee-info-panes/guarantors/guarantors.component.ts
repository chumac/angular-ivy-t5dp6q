
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { LoadApprovedDataGuarantorSuccess, LoadAwaitingApprovalDataGuarantorSuccess, HideEditorGuarantor, ShowEditorGuarantor, ShowViewerGuarantor, HideViewerGuarantor, DeleteApprovedDataGuarantor, RemoveAwaitingApprovalDataGuarantor, getGuarantorData, showEditorGuarantor, showViewerGuarantor, getGuarantorApprovedData, getGuarantorAwaitingApprovalData, LoadInlineDocumentGuarantor, LoadApprovedPhotoGuarantor, LoadAwaitingApprovalPhotoGuarantor, ClearViewerPhotoGuarantor, getGuarantorApprovedPhoto, getGuarantorAwaitingApprovalPhoto, LoadDataGuarantor, DeleteAwaitingApprovalDataGuarantor, getGuarantorInlineDocument } from '@nutela/store/modules/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';
import { IGuarantor, IBasicOrganisation } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { APPROVAL_STATUS } from '@nutela/shared/app-global';
import { GuarantorsEditorComponent } from './guarantors-editor/guarantors-editor.component';
import { GuarantorsViewerComponent } from './guarantors-viewer/guarantors-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData, getOrganisations, allowOrganisationChoiceList } from '@nutela/store/modules/foundation';
import { DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { ISelectOption } from '@nutela/models/core-data';
import { from } from 'rxjs/internal/observable/from';

@Component({
  selector: 'x365-fm-workforce-guarantors',
  templateUrl: './guarantors.component.html',
  styleUrls: ['./guarantors.component.scss']
})
export class GuarantorsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];

  guarantorData$: Observable<IGuarantor[]>;

  approvedData$: Observable<IGuarantor[]>;
  awaitingApprovalData$: Observable<IGuarantor[]>;
  documentData$: Observable<any>;
  imageData$: Observable<any>;

  organisations$: Observable<IBasicOrganisation[]>;
  orgAddress$: Observable<ISelectOption[]>;
  useApprovedOrgs$: Observable<string>;



  @ViewChild('editor') editor: GuarantorsEditorComponent;
  @ViewChild('viewer') viewer: GuarantorsViewerComponent;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeSelects();
    this.getGridData();
    this.store.dispatch(new LoadDataGuarantor());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorGuarantor));
    this.showViewer$ = this.store.pipe(select(showViewerGuarantor));

    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.organisations$ = this.store.pipe(select(getOrganisations));


    this.guarantorData$ = this.store.pipe(select(getGuarantorData));

    this.approvedData$ = this.store.pipe(select(getGuarantorApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getGuarantorAwaitingApprovalData));

    this.useApprovedOrgs$ = this.store.pipe(select(allowOrganisationChoiceList));
    // this.useApprovedOrgs$ = from(['YES']);

  }

  getGridData() {
    this.guarantorData$
      .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.approved)))
        .subscribe((result) => {
            this.store.dispatch(new LoadApprovedDataGuarantorSuccess(result));
          }
        );

    this.guarantorData$
      .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.queued)))
        .subscribe((result) => {
            this.store.dispatch(new LoadAwaitingApprovalDataGuarantorSuccess(result));
          }
        );
  }

  getRowApprovedData$(rowId: number): Observable<IGuarantor> {
    return this.guarantorData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.approved)),
      map(d => d.filter(v => v.guarantor_id === rowId)),
      map(e => e.shift()))
  }

  getRowAwaitingApprovalData$(rowId: number): Observable<IGuarantor> {
    return this.guarantorData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.queued)),
      map(d => d.filter(v => v.guarantor_id === rowId)),
      map(e => e.shift()))
  }

  getViewRowAwaitingApprovalData$(rowId: number): Observable<IGuarantor> {
    return this.awaitingApprovalData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.queued)),
      map(d => d.filter(v => v.guarantor_id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorGuarantor());
        }
      );
  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          this.store.dispatch(new LoadApprovedPhotoGuarantor({recordId: rowId}));
          this.imageData$ = this.store.pipe(select(getGuarantorApprovedPhoto));

          this.store.dispatch(new LoadInlineDocumentGuarantor({recordId: rowId, isApproved: true}));
          this.documentData$ = this.store.pipe(select(getGuarantorInlineDocument));

          this.store.dispatch(new ShowViewerGuarantor());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getViewRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new LoadAwaitingApprovalPhotoGuarantor({recordId: rowId}));
          this.imageData$ = this.store.pipe(select(getGuarantorAwaitingApprovalPhoto));

          this.store.dispatch(new LoadInlineDocumentGuarantor({recordId: rowId, isApproved: false}));
          this.documentData$ = this.store.pipe(select(getGuarantorInlineDocument));

          this.store.dispatch(new ShowViewerGuarantor());
        }
      );
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteApprovedDataGuarantor({ recordId: rowId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteApprovedDataGuarantor({recordId: rowId}));
    //     }
    //   });
  }

  onAwaitingApprovalDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteAwaitingApprovalDataGuarantor({ recordId: rowId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteAwaitingApprovalDataGuarantor({recordId: rowId}));
    //       // this.store.dispatch(new RemoveAwaitingApprovalDataGuarantor({recordId: rowId}));
    //     }
    //   });
  }

  onApprovedDownloadIconClicked(rowId: number) {
    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.attach_document === null || result.attach_document === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentGuarantor({recordId: rowId, isApproved: true}));
          }
        }
      );
  }

  onAwaitingApprovalDownloadIconClicked(rowId: number) {
    this.getViewRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
        console.log(result);
          if (result.attach_document === null || result.attach_document === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
            this.store.dispatch(new LoadInlineDocumentGuarantor({recordId: rowId, isApproved: false}));

          } else {
            this.store.dispatch(new LoadInlineDocumentGuarantor({recordId: rowId, isApproved: false}));
          }
        }
      );
  }

  hasDocumentApproved(rowId: number):boolean {
    let status = false;

    this.getRowApprovedData$(rowId).pipe(take(1))
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
    this.store.dispatch(new HideEditorGuarantor());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerGuarantor());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
