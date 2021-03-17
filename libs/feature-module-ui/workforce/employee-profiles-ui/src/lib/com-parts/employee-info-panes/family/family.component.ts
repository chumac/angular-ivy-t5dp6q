
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { getFamilyData, getFamilyApprovedData, getFamilyAwaitingApprovalData, getFamilyDocument, LoadAwaitingApprovalDataFamilySuccess, LoadApprovedDataFamilySuccess, ShowEditorFamily, LoadDocumentFamily, ShowViewerFamily, DeleteApprovedDataFamily, RemoveAwaitingApprovalDataFamily, LoadInlineDocumentFamily, HideEditorFamily, HideViewerFamily, showEditorFamily, showViewerFamily, LoadApprovedDataItemFamily, getFamilyApprovedDataMap, LoadApprovedPhotoFamily, getFamilyApprovedPhoto, LoadAwaitingApprovalPhotoFamily, getFamilyAwaitingApprovalPhoto, LoadDataFamily, DeleteAwaitingApprovalDataFamily } from '@nutela/store/modules/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';
import { IFamily } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { APPROVAL_STATUS } from '@nutela/shared/app-global';
import { FamilyEditorComponent } from './family-editor/family-editor.component';
import { FamilyViewerComponent } from './family-viewer/family-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { ThreeWaySwitchComponent } from 'libs/feature-module-ui/workforce/subscription-ui/src/lib/com-parts/three-way-switch/three-way-switch.component';

@Component({
  selector: 'x365-fm-workforce-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;
  institutions$: Observable<ISelectOption[]>;
  courses$: Observable<ISelectOption[]>;

  public data: any[];

  familyData$: Observable<IFamily[]>;

  approvedData$: Observable<IFamily[]>;
  awaitingApprovalData$: Observable<IFamily[]>;
  documentData$: Observable<any>;
  imageData$: Observable<any>;
  inlineDocumentData$: Observable<any>;

  inlineDocumentDataSubscription: Subscription = null;

  @ViewChild('editor') editor: FamilyEditorComponent;
  @ViewChild('viewer') viewer: FamilyViewerComponent;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
    this.getGridData();
    this.pushApprovedDataToStore();

  }

  storeDispatches() {
    this.store.dispatch(new LoadDataFamily());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorFamily));
    this.showViewer$ = this.store.pipe(select(showViewerFamily));

    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));

    this.familyData$ = this.store.pipe(select(getFamilyData));

    this.approvedData$ = this.store.pipe(select(getFamilyApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getFamilyAwaitingApprovalData));
    this.documentData$ = this.store.pipe(select(getFamilyDocument));
  }

  approvedDataList():Observable<IFamily[]>  {
    return this.familyData$
    .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.approved)));
  }

  awaitingApprovalDataList():Observable<IFamily[]>  {
    return this.familyData$
    .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.queued)));
  }

  pushApprovedDataToStore() {
    this.approvedDataList()
      .subscribe((list: IFamily[]) => {
        list.forEach((data: IFamily) => this.store.dispatch(new LoadApprovedDataItemFamily({recordId: data.family_id})));
      }
    );
  }

  getGridData() {
    this.familyData$
      .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.approved)))
        .subscribe((result) => {
            this.store.dispatch(new LoadApprovedDataFamilySuccess(result));
          }
        );

    this.familyData$
      .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.queued)))
        .subscribe((result) => {
            this.store.dispatch(new LoadAwaitingApprovalDataFamilySuccess(result));
          }
        );
  }

  getRowApprovedData$(rowId: number): Observable<IFamily> {
    return this.familyData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.approved)),
      map(d => d.filter(v => v.family_id === rowId)),
      map(e => e.shift()))
  }

  getRowAwaitingApprovalData$(rowId: number): Observable<IFamily> {
    return this.familyData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.queued)),
      map(d => d.filter(v => v.family_id === rowId)),
      map(e => e.shift()))
  }

  getViewRowAwaitingApprovalData$(rowId: number): Observable<IFamily> {
    return this.awaitingApprovalData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.queued)),
      map(d => d.filter(v => v.family_id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.store.pipe(select(getFamilyApprovedDataMap), take(1))
      .subscribe((data: {[key: number]: IFamily}) => {
        const item = data[rowId];
        if (item) {
          this.editor.data = item;
          this.editor.reset();
          this.store.dispatch(new ShowEditorFamily());
        }
      })
  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentFamily({recordId: rowId, isApproved: true}));
          }
          this.store.dispatch(new LoadApprovedPhotoFamily({recordId: rowId}));
          this.imageData$ = this.store.pipe(select(getFamilyApprovedPhoto));

          this.store.dispatch(new ShowViewerFamily());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getViewRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          if (result.img_url !== '') {
            this.store.dispatch(new LoadDocumentFamily({recordId: rowId, isApproved: false}));
          }
          this.store.dispatch(new LoadAwaitingApprovalPhotoFamily({recordId: rowId}));
          this.imageData$ = this.store.pipe(select(getFamilyAwaitingApprovalPhoto));
          this.store.dispatch(new ShowViewerFamily());
        }
      );
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteApprovedDataFamily({ recordId: rowId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteApprovedDataFamily({recordId: rowId}));
    //     }
    //   });
  }

  onAwaitingApprovalDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteAwaitingApprovalDataFamily({ recordId: rowId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteAwaitingApprovalDataFamily({recordId: rowId}));
    //       // this.store.dispatch(new RemoveAwaitingApprovalDataFamily({recordId: rowId}));
    //     }
    //   });
  }

  onApprovedDownloadIconClicked(rowId: number) {
    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.img_url === null || result.img_url === '') {
            this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, options: toastOptionsInformation()}));
          } else {
            this.store.dispatch(new LoadInlineDocumentFamily({recordId: rowId, isApproved: true}));
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
            this.store.dispatch(new LoadInlineDocumentFamily({recordId: rowId, isApproved: false}));
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
    this.store.dispatch(new HideEditorFamily());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerFamily());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
