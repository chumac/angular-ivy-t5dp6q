
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { ReboardBeneficiariesEditorComponent } from './reboard-beneficiaries-editor/reboard-beneficiaries-editor.component';
import { ReboardBeneficiariesViewerComponent } from './reboard-beneficiaries-viewer/reboard-beneficiaries-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { DialogService } from '@nutela/shared/ui';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { showEditorReboardBeneficiary, showViewerReboardBeneficiary, LoadDataReboardBeneficiary, ShowEditorReboardBeneficiary, ShowViewerReboardBeneficiary, HideEditorReboardBeneficiary, HideViewerReboardBeneficiary, getReboardBeneficiaryData, getReboardBeneficiaryPhoto, LoadPhotoReboardBeneficiary, DeleteDataReboardBeneficiary, ClearViewerPhotoReboardBeneficiary } from '../../../store/my-reboard-data';

@Component({
  selector: 'x365-fm-workforce-reboard-beneficiaries',
  templateUrl: './reboard-beneficiaries.component.html',
  styleUrls: ['./reboard-beneficiaries.component.scss']
})
export class ReboardBeneficiariesComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];
  @Input() reboardMode: number;

  beneficiaryData$: Observable<IBeneficiary[]>;

  approvedData$: Observable<IBeneficiary[]>;
  awaitingApprovalData$: Observable<IBeneficiary[]>;
  documentData$: Observable<any>;
  imageData$: Observable<any>;

  @ViewChild('editor') editor: ReboardBeneficiariesEditorComponent;
  @ViewChild('viewer') viewer: ReboardBeneficiariesViewerComponent;

  constructor(private store: Store<IAppState>, private dialogService: DialogService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorReboardBeneficiary));
    this.showViewer$ = this.store.pipe(select(showViewerReboardBeneficiary));
    this.imageData$ = this.store.pipe(select(getReboardBeneficiaryPhoto));
    this.beneficiaryData$ = this.store.pipe(select(getReboardBeneficiaryData));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataReboardBeneficiary());
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
      this.store.dispatch(new ShowEditorReboardBeneficiary());
    })
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          this.store.dispatch(new LoadPhotoReboardBeneficiary({recordId: rowId}));
          this.store.dispatch(new ShowViewerReboardBeneficiary());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete your data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteDataReboardBeneficiary({ recordId: rowId }));
      }
    });
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorReboardBeneficiary());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerReboardBeneficiary());
    this.store.dispatch(new ClearViewerPhotoReboardBeneficiary());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
