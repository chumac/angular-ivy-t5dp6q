import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IgxGridComponent } from 'igniteui-angular';
import { Store, select } from '@ngrx/store';
import { TransferImportService } from './transfer-imports.service';
import { UtilService } from '@nutela/core-services';
import { IEmployeesProfileState } from '../../../../store/root';
import { DialogBoxService } from '@nutela/shared/ui';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/internal/Observable';
import { ITransferImportTransaction } from '@nutela/models/workforce/employee-profiles';
import { getImportTransfer, isLoadingTransfer, LoadImportTransfer, LoadingTransfer, getStatusTransfer,
         getBatchTransfer,  LoadImportTransferSuccess, SaveImportTransfer, LoadStatusTransfer, LoadBatchTransfer, ProcessingTransfer, isProcessingTransfer } from '../../../../store/hr-transactions/transfer';
import { ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { isUndefined } from 'util';

@Component({
  selector: 'x365-fm-workforce-transfer-imports',
  templateUrl: './transfer-imports.component.html',
  styleUrls: ['./transfer-imports.component.scss'],
  providers: [TransferImportService]
})
export class TransferImportsComponent implements OnInit {


  public transferImport$: Observable<ITransferImportTransaction[]>;
  status$: Observable<ISelectOption[]>;
  batch$: Observable<ISelectOption[]>;
  isLoading$:Observable<boolean>;
  isProcessing$:Observable<boolean>;

  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild("transferImportGrid") transferImportGrid: IgxGridComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private utilService: UtilService,
    private titleService: Title,
    public service: TransferImportService,
    private store: Store<IEmployeesProfileState>,
    private dialogBoxService: DialogBoxService,
  ) {
    titleService.setTitle(`${'Transfer Imports Transaction'}${this.partialDocumentTitle}`)
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new  LoadImportTransfer());
    this.store.dispatch(new LoadingTransfer());


    this.store.dispatch(new LoadStatusTransfer());
    this.store.dispatch(new LoadBatchTransfer());
  }

  storeSelects() {
    this.transferImport$ = this.store.pipe(select(getImportTransfer));
    this.isLoading$=this.store.pipe(select(isLoadingTransfer));
    this.isProcessing$=this.store.pipe(select(isProcessingTransfer));

    this.status$ = this.store.pipe(select(getStatusTransfer));
    this.batch$ = this.store.pipe(select(getBatchTransfer));
  }


  search() {
    let filterBy: string = '';
    const searchString = this.searchInput.nativeElement.value;

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.transferImportGrid) {
      this.service.search(this.transferImportGrid, searchString, filterBy);
    }
  }

  getStatusData(rowId: number): ITransferImportTransaction[] {
    console.log('data row', rowId);
    let arr: ITransferImportTransaction[];
      this.transferImport$.subscribe(res=>{
        arr=res.filter(v => v.status === rowId)
            console.log('sres',res);
          })

    return arr;
  }

  getBatchData(batch: string): ITransferImportTransaction[] {
    console.log('data row', batch);
    let arr: ITransferImportTransaction[];
      this.transferImport$.subscribe(res=>{
        arr=res.filter(v => v.batch_identifier === batch)
            console.log('bares',res);
          })

    return arr;
  }

  onProcess(){
    console.log('batchid',this.service.batchId);
    if (isUndefined(this.service.batchId)) {
    this.store.dispatch(new ShowToast({title: null, message: `Please filter by Batch.`, type: ToastTypes.INFO}));
    }
    else{
      this.store.dispatch(new ProcessingTransfer());
      this.store.dispatch(new SaveImportTransfer({batchId:this.service.batchId}))
    }

    // this.transferImport$.subscribe(res=>{
    //   // this.store.dispatch(new SaveImportTransfer({data:res,batchId:this.service.batchId}))
    // })
  }

  onStatus($event){
   console.log($event.label);
   this.store.dispatch(new LoadImportTransferSuccess(this.getStatusData($event.label)));
  }

  onBatch($event){
    console.log($event.label);
    this.service.batchId=$event.value;
    this.store.dispatch(new LoadImportTransferSuccess(this.getBatchData($event.label)));
  }

  onRefresh(){
  this.store.dispatch(new LoadImportTransfer());
  this.store.dispatch(new ShowToast({title: null, message: `Import Transfer data was refresh successfully.`, type: ToastTypes.SUCCESS}),
  )
  }
}
