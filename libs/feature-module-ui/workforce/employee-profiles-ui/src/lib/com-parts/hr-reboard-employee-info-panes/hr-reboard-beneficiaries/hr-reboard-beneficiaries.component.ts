
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { HrReboardBeneficiariesEditorComponent } from './hr-reboard-beneficiaries-editor/hr-reboard-beneficiaries-editor.component';
import { HrReboardBeneficiariesViewerComponent } from './hr-reboard-beneficiaries-viewer/hr-reboard-beneficiaries-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { DialogService } from '@nutela/shared/ui';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { showEditorHrReboardBeneficiary, showViewerHrReboardBeneficiary, LoadDataHrReboardBeneficiary, ShowEditorHrReboardBeneficiary, ShowViewerHrReboardBeneficiary, HideEditorHrReboardBeneficiary, HideViewerHrReboardBeneficiary, getHrReboardBeneficiaryData, getHrReboardBeneficiaryPhoto, LoadPhotoHrReboardBeneficiary, DeleteDataHrReboardBeneficiary, ClearViewerPhotoHrReboardBeneficiary } from '../../../store/hr-reboard-data';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-beneficiaries',
  templateUrl: './hr-reboard-beneficiaries.component.html',
  styleUrls: ['./hr-reboard-beneficiaries.component.scss']
})
export class HrReboardBeneficiariesComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];
  @Input() reboardMode: number;
  @Input() employeeId: number;

  beneficiaryData$: Observable<IBeneficiary[]>;

  approvedData$: Observable<IBeneficiary[]>;
  awaitingApprovalData$: Observable<IBeneficiary[]>;
  documentData$: Observable<any>;
  imageData$: Observable<any>;

  @ViewChild('editor') editor: HrReboardBeneficiariesEditorComponent;
  @ViewChild('viewer') viewer: HrReboardBeneficiariesViewerComponent;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorHrReboardBeneficiary));
    this.showViewer$ = this.store.pipe(select(showViewerHrReboardBeneficiary));
    this.imageData$ = this.store.pipe(select(getHrReboardBeneficiaryPhoto));
    this.beneficiaryData$ = this.store.pipe(select(getHrReboardBeneficiaryData));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataHrReboardBeneficiary({employeeId: this.employeeId}));
  }

  getRowData$(rowId: number): Observable<IBeneficiary> {
    return this.beneficiaryData$.pipe(
      map(d => d.filter(v => v.beneficiary_id === rowId)),
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
      this.editor.setCountryLists(result);
      this.store.dispatch(new ShowEditorHrReboardBeneficiary());
    })
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          this.store.dispatch(new LoadPhotoHrReboardBeneficiary({beneficiaryId: rowId, employeeId: this.employeeId}));
          this.store.dispatch(new ShowViewerHrReboardBeneficiary());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete your data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteDataHrReboardBeneficiary({ beneficiaryId: rowId, employeeId: this.employeeId }));
      }
    });
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorHrReboardBeneficiary());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHrReboardBeneficiary());
    this.store.dispatch(new ClearViewerPhotoHrReboardBeneficiary());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
