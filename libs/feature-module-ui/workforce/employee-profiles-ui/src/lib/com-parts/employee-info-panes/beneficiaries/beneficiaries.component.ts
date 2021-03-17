
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { LoadApprovedDataBeneficiarySuccess, LoadAwaitingApprovalDataBeneficiarySuccess, HideEditorBeneficiary, ShowEditorBeneficiary, ShowViewerBeneficiary, HideViewerBeneficiary, DeleteApprovedDataBeneficiary, RemoveAwaitingApprovalDataBeneficiary, getBeneficiaryData, showEditorBeneficiary, showViewerBeneficiary, getBeneficiaryApprovedData, getBeneficiaryAwaitingApprovalData, LoadApprovedDataItemBeneficiary, getBeneficiaryApprovedDataMap, LoadApprovedPhotoBeneficiary, getBeneficiaryApprovedPhoto, getBeneficiaryAwaitingApprovalPhoto, LoadAwaitingApprovalPhotoBeneficiary, LoadDataBeneficiary, DeleteAwaitingApprovalDataBeneficiary } from '@nutela/store/modules/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';
import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { APPROVAL_STATUS } from '@nutela/shared/app-global';
import { BeneficiariesEditorComponent } from './beneficiaries-editor/beneficiaries-editor.component';
import { BeneficiariesViewerComponent } from './beneficiaries-viewer/beneficiaries-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { getSelectOptionData } from '@nutela/store/modules/foundation';

@Component({
  selector: 'x365-fm-workforce-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.scss']
})
export class BeneficiariesComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];

  beneficiaryData$: Observable<IBeneficiary[]>;

  approvedData$: Observable<IBeneficiary[]>;
  awaitingApprovalData$: Observable<IBeneficiary[]>;
  documentData$: Observable<any>;
  imageData$: Observable<any>;

  @ViewChild('editor') editor: BeneficiariesEditorComponent;
  @ViewChild('viewer') viewer: BeneficiariesViewerComponent;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeSelects();
    this.getGridData();
    this.pushApprovedDataToStore();
    this.store.dispatch(new LoadDataBeneficiary());

  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorBeneficiary));
    this.showViewer$ = this.store.pipe(select(showViewerBeneficiary));

    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));

    this.beneficiaryData$ = this.store.pipe(select(getBeneficiaryData));

    this.approvedData$ = this.store.pipe(select(getBeneficiaryApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getBeneficiaryAwaitingApprovalData));
  }

  approvedDataList():Observable<IBeneficiary[]>  {
    return this.beneficiaryData$
    .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.approved)));
  }

  awaitingApprovalDataList():Observable<IBeneficiary[]>  {
    return this.beneficiaryData$
    .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.queued)));
  }

  pushApprovedDataToStore() {
    this.approvedDataList()
      .subscribe((list: IBeneficiary[]) => {
        list.forEach((data: IBeneficiary) => this.store.dispatch(new LoadApprovedDataItemBeneficiary({recordId: data.beneficiary_id})));
      }
    );
  }

  getGridData() {
    this.beneficiaryData$
      .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.approved)))
        .subscribe((result) => {
            this.store.dispatch(new LoadApprovedDataBeneficiarySuccess(result));
          }
        );

    this.beneficiaryData$
      .pipe(map(data => data.filter(val => val.approval_status === APPROVAL_STATUS.queued)))
        .subscribe((result) => {
            this.store.dispatch(new LoadAwaitingApprovalDataBeneficiarySuccess(result));
          }
        );
  }

  getRowApprovedData$(rowId: number): Observable<IBeneficiary> {
    return this.beneficiaryData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.approved)),
      map(d => d.filter(v => v.beneficiary_id === rowId)),
      map(e => e.shift()))
  }

  getRowAwaitingApprovalData$(rowId: number): Observable<IBeneficiary> {
    return this.beneficiaryData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.queued)),
      map(d => d.filter(v => v.beneficiary_id === rowId)),
      map(e => e.shift()))
  }

  getViewRowAwaitingApprovalData$(rowId: number): Observable<IBeneficiary> {
    return this.awaitingApprovalData$.pipe(
      map(c => c.filter(val => val.approval_status === APPROVAL_STATUS.queued)),
      map(d => d.filter(v => v.beneficiary_id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.store.pipe(select(getBeneficiaryApprovedDataMap), take(1))
      .subscribe((data: {[key: number]: IBeneficiary}) => {
        const item = data[rowId];
        if (item) {
          this.editor.data = item;
          this.editor.reset();
          this.store.dispatch(new ShowEditorBeneficiary());
        }
      })
  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          this.store.dispatch(new LoadApprovedPhotoBeneficiary({recordId: rowId}));
          this.imageData$ = this.store.pipe(select(getBeneficiaryApprovedPhoto));
          this.store.dispatch(new ShowViewerBeneficiary());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getViewRowAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          this.store.dispatch(new LoadAwaitingApprovalPhotoBeneficiary({recordId: rowId}));
          this.imageData$ = this.store.pipe(select(getBeneficiaryAwaitingApprovalPhoto));
          this.store.dispatch(new ShowViewerBeneficiary());
        }
      );
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete your data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteApprovedDataBeneficiary({ recordId: rowId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteApprovedDataBeneficiary({recordId: rowId}));
    //     }
    //   });
  }

  onAwaitingApprovalDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteAwaitingApprovalDataBeneficiary({ recordId: rowId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteAwaitingApprovalDataBeneficiary({recordId: rowId}));
    //       // this.store.dispatch(new RemoveAwaitingApprovalDataBeneficiary({recordId: rowId}));
    //     }
    //   });
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorBeneficiary());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerBeneficiary());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
