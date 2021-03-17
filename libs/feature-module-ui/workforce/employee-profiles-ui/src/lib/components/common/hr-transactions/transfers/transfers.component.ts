import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { TransferService } from './transfers.service';
import { UtilService } from '@nutela/core-services';
import { Title } from '@angular/platform-browser';
import { IgxGridComponent } from 'igniteui-angular';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../../store/root';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { getAwaitingDirectTransfer, getApprovedDirectTransfer, isLoadingTransfer, LoadingTransfer,
         LoadApprovedDirectTransfer, LoadAwaitingDirectTransfer, showEditorTransfer,
         ShowEditorTransfer, HideEditorTransfer, LoadPositionTransfer, LoadSpecificTypeTransfer,
         DeleteTransfer, HideViewerTransfer, ShowViewerTransfer, showViewerTransfer, LoadAwaitingDirectTransferSuccess, LoadApprovedDirectTransferSuccess, } from '../../../../store/hr-transactions/transfer';
import { Observable } from 'rxjs';
import { ITransferTransaction } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';
import { map, take } from 'rxjs/operators';
import { TransferEditorComponent } from './transfer-editor/transfer-editor.component';
import { ShowToast } from '@nutela/store/shared';
import { TransferViewerComponent } from './transfer-viewer/transfer-viewer.component';
import { DxLookupComponent } from 'devextreme-angular';
import { getActivePersonnel } from '@nutela/store/modules/foundation';

@Component({
  selector: 'x365-fm-workforce-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss'],
  providers: [TransferService]
})

export class TransfersComponent implements OnInit {

  public approved$: Observable<ITransferTransaction[]>;
  public awaiting$: Observable<ITransferTransaction[]>;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  activePersonnel$: Observable<ISelectOption[]>;

  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild("approvedGrid") approvedGrid: IgxGridComponent;
  @ViewChild("awaitingGrid") awaitingGrid: IgxGridComponent;

  @ViewChild('editor') editor: TransferEditorComponent;
  @ViewChild('viewer') viewer: TransferViewerComponent;

  @ViewChild('employeeLook') employeeLook: DxLookupComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private utilService: UtilService,
    private titleService: Title,
    public service: TransferService,
    private store: Store<IEmployeesProfileState>,
    private router: Router,
    private dialogBoxService: DialogBoxService,
  ) {
    titleService.setTitle(`${'Transfer Transaction'}${this.partialDocumentTitle}`)
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadingTransfer());
    // this.store.dispatch(new LoadApprovedDirectTransfer({employeeId: this.employeeLook.value}));
    // this.store.dispatch(new LoadAwaitingDirectTransfer({employeeId: this.employeeLook.value}));
    this.store.dispatch(new LoadPositionTransfer());
    this.store.dispatch(new LoadSpecificTypeTransfer());
  }

  storeSelects() {
    this.approved$ = this.store.pipe(select(getApprovedDirectTransfer));
    this.awaiting$ = this.store.pipe(select(getAwaitingDirectTransfer));
    this.isLoading$=this.store.pipe(select(isLoadingTransfer));
    this.showEditor$=this.store.pipe(select(showEditorTransfer));
    this.showViewer$ = this.store.pipe(select(showViewerTransfer));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));
  }


  search() {
    let filterBy: string = '';
    let searchString:string='';
    if(this.searchInput){
     searchString = this.searchInput.nativeElement.value;
    }

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.approvedGrid) {
      this.service.search(this.approvedGrid, searchString, filterBy);
    }
    else if(this.awaitingGrid){
      this.service.search(this.awaitingGrid, searchString, filterBy);
    }
  }

  loadDirectTransferData(event: any) {
    const employeeId = this.employeeLook.value;
    if (employeeId) {
      this.store.dispatch(new LoadingTransfer());
      this.store.dispatch(new LoadApprovedDirectTransfer({ employeeId: employeeId }));
      this.store.dispatch(new LoadAwaitingDirectTransfer({ employeeId: employeeId }));
    } else {
      this.store.dispatch(new LoadAwaitingDirectTransferSuccess([]));
      this.store.dispatch(new LoadApprovedDirectTransferSuccess([]));
      this.store.dispatch(new ShowToast({ title: null, message: `Transfer records can not be loaded when employee is not selected.`, type: ToastTypes.INFO }),)
    }
  }

  onImport(){
    this.router.navigate([`${STANDARD_ROUTES.transferImport}/import`]);
  }

  onAdd(){
  this.store.dispatch(new ShowEditorTransfer());
  }

  getAwaitingTransferTransactionData$(rowId: number): Observable<ITransferTransaction> {
    return this.awaiting$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  getApprovedTransferTransactionData$(rowId: number): Observable<ITransferTransaction> {
    return this.approved$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAwaitingEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getAwaitingTransferTransactionData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorTransfer());
      }
      );
  }

  onApprovedEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getApprovedTransferTransactionData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorTransfer());
      }
      );
  }

  onApprovedPositionViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getApprovedTransferTransactionData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerTransfer());
        }
      );
  }

  onAwaitingPositionViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getAwaitingTransferTransactionData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerTransfer());
        }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteTransfer({recordId: row_id, employeeId: this.employeeLook.value}));
        }
      });
  }

  onRefresh() {
    if (this.employeeLook.value) {
      this.store.dispatch(new LoadApprovedDirectTransfer({employeeId: this.employeeLook.value}));
      this.store.dispatch(new LoadAwaitingDirectTransfer({ employeeId: this.employeeLook.value }));
      this.store.dispatch(new ShowToast({ title: null, message: `Transfer data was refreshed successfully.`, type: ToastTypes.SUCCESS }),)
      return;
    }
    this.store.dispatch(new ShowToast({title: null, message: `You need to select an employee to rightly refresh data.`, type: ToastTypes.INFO}),)

  }

  onEmployeeChanged(e) {
    console.log('employee changed to ', e);
    this.employeeLook.value = e;
  }

  onCancelEditor(){
    this.store.dispatch(new HideEditorTransfer());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerTransfer());
  }
}
