
import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';
import { map, take } from 'rxjs/operators';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { DialogService } from '@nutela/shared/ui';
import { HrBeneficiariesViewerComponent } from './hr-beneficiaries-viewer/hr-beneficiaries-viewer.component';
import { HrBeneficiariesEditorComponent } from './hr-beneficiaries-editor/hr-beneficiaries-editor.component';

import { IEmployeesProfileState } from '../../../store/root';
import { showEditorHRBeneficiary, showViewerHRBeneficiary, getHRBeneficiaryApprovedData, getBeneficiaryAwaitingApprovalData, ShowEditorHRBeneficiary, LoadApprovedPhotoHRBeneficiary, getBeneficiaryApprovedPhoto, ShowViewerHRBeneficiary, LoadAwaitingApprovalPhotoHRBeneficiary, getBeneficiaryAwaitingApprovalPhoto, DeleteApprovedDataHRBeneficiary, HideEditorHRBeneficiary, HideViewerHRBeneficiary, LoadApprovedDataHRBeneficiary, LoadAwaitingApprovalDataHRBeneficiary, ProcessingHRBeneficiary, DeleteAwaitingApprovalDataHRBeneficiary } from '../../../store/employee-detailed-area';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'x365-fm-workforce-hr-beneficiaries',
  templateUrl: './hr-beneficiaries.component.html',
  styleUrls: ['./hr-beneficiaries.component.scss']
})
export class HrBeneficiariesComponent implements OnInit {

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];

  beneficiaryData$: Observable<IBeneficiary[]>;

  approvedData$: Observable<IBeneficiary[]>;
  awaitingApprovalData$: Observable<IBeneficiary[]>;
  documentData$: Observable<any>;
  imageData$: Observable<any>;
  @Input() employeeId: number;

  @ViewChild('editor') editor: HrBeneficiariesEditorComponent;
  @ViewChild('viewer') viewer: HrBeneficiariesViewerComponent;

  constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,private store: Store<IEmployeesProfileState>,
              private dialogService: DialogService) {
                titleService.setTitle(
                  `${'HR Beneficiaries'}${this.partialDocumentTitle}`
                );
              }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorHRBeneficiary));
    this.showViewer$ = this.store.pipe(select(showViewerHRBeneficiary));

    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData))

    this.approvedData$ = this.store.pipe(select(getHRBeneficiaryApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getBeneficiaryAwaitingApprovalData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataHRBeneficiary({employeeId:this.employeeId}));
    this.store.dispatch(new LoadAwaitingApprovalDataHRBeneficiary({employeeId:this.employeeId}));
    this.store.dispatch(new ProcessingHRBeneficiary());
  }

  getApprovedData$(rowId: number): Observable<IBeneficiary> {
    return this.approvedData$.pipe(
      map(d => d.filter(v => v.beneficiary_id === rowId)),
      map(e => e.shift()))
  }

  getAwaitingApprovalData$(rowId: number): Observable<IBeneficiary> {
    return this.awaitingApprovalData$.pipe(
      map(d => d.filter(v => v.beneficiary_id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(rowId: number) {
      this.editor.data = null;
      this.getApprovedData$(rowId).pipe(take(1))
        .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorHRBeneficiary());
        }
        );
  }

  onApprovedViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getApprovedData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          this.store.dispatch(new LoadApprovedPhotoHRBeneficiary({recordId: rowId, employeeId: this.employeeId}));
          this.imageData$ = this.store.pipe(select(getBeneficiaryApprovedPhoto));
          this.store.dispatch(new ShowViewerHRBeneficiary());
        }
      );
  }

  onAwaitingApprovalViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getAwaitingApprovalData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;

          this.store.dispatch(new LoadAwaitingApprovalPhotoHRBeneficiary({recordId: rowId, employeeId:this.employeeId}));
          this.imageData$ = this.store.pipe(select(getBeneficiaryAwaitingApprovalPhoto));
          this.store.dispatch(new ShowViewerHRBeneficiary());
        }
      );
  }

  onApprovedDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete your data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteApprovedDataHRBeneficiary({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       this.store.dispatch(new DeleteApprovedDataHRBeneficiary({recordId: rowId, employeeId: this.employeeId}));
    //     }
    //   });
  }

  onAwaitingApprovalDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete your data awaiting approval?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteAwaitingApprovalDataHRBeneficiary({ recordId: rowId, employeeId: this.employeeId }));
      }
    });
    // this.dialogBoxService.show(`Are you sure you want to delete your data awaiting approval?`).pipe(take(1))
    //   .subscribe((command: string) => {
    //     if (command === DialogBoxCommandTypes.COMMAND1) {
    //       // this.store.dispatch(new DeleteAwaitingApprovalDataBeneficiary({recordId: rowId}));
    //       this.store.dispatch(new DeleteAwaitingApprovalDataHRBeneficiary({recordId: rowId, employeeId: this.employeeId}));
    //     }
    //   });
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorHRBeneficiary());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHRBeneficiary());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
