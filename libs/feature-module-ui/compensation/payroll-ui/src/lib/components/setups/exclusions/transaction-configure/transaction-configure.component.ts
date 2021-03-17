import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IExclusionType } from '@nutela/models/compensation/payroll';
import { BaseFormComponent, STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { IgxGridComponent } from 'igniteui-angular';
import { IConfigureTransactionCreate } from 'libs/models/compensation/payroll/src/lib/interfaces/configure-transaction-create.interface';
import { IConfigureTransaction } from 'libs/models/compensation/payroll/src/lib/interfaces/configure-transaction.interface';
import { IExclusionItemType } from 'libs/models/compensation/payroll/src/lib/interfaces/exclusion-item-type.interface';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DeleteTransactionConfigure, getConfigureTransactionData, getConfigureTransactionDataEdit, getExclusionItemTypeData, getExclusionScopeData, getExclusionTypeData, HideConfigureTransaction, HideEditorConfigureTransactionCreate, isLoadingExclusion, isProcessingExclusion, LoadConfigureTransactionData, LoadConfigureTransactionDataSuccess, LoadEditConfigureData, LoadExclusionItemTypeData, LoadExclusionScopeData, LoadExclusionTypeData, NotProcessingConfigureTransaction, ShowConfigureTransaction, showEditorConfigureCreate, ShowEditorConfigureTransactionCreate } from '../../../../store/setup/transaction';
import { ConfigureService } from './configure.service';
import { TransactionConfigureEditorComponent } from './transaction-configure-editor/transaction-configure-editor.component';

@Component({
  selector: 'x365-fm-payrl-transaction-configure',
  templateUrl: './transaction-configure.component.html',
  styleUrls: ['./transaction-configure.component.scss']
})
export class TransactionConfigureComponent extends BaseFormComponent implements OnInit {
  configureTransactionData$: Observable<IConfigureTransactionCreate[]>;
  getConfigureTransactionData$: Observable<IConfigureTransaction>;

  public configureTransactionData: Observable<IConfigureTransaction[]>;
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IConfigureTransaction;
  @Input() public exclusionId: number;

  @Output() cancelClick = new EventEmitter<any>();

  isLoading$: Observable<boolean>;
  showCreateConfigureEditor$: Observable<boolean>;
  exclusionTypeData$ : Observable<IExclusionType[]>;
  isProcessing$: Observable<boolean>;
  
  @ViewChild("configureTransactionDataGrid") configureTransactionDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild("configureeditor") configureeditor: TransactionConfigureEditorComponent;

  subscribe: any;

  constructor(
    public utilService: UtilService,
    public service: ConfigureService,
    private dialogBoxService: DialogBoxService,
    private store: Store<IConfigureTransaction>,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super();
    this.assignProfileId()
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }
  assignProfileId() {
    this.route.params.pipe(take(1)).subscribe(v => {
      if(v.exclusionId != null){
        this.exclusionId =  parseInt(v.exclusionId);
        this.store.dispatch(new ShowConfigureTransaction());
        this.store.dispatch(new LoadConfigureTransactionData(v.exclusionId));
      }
    
    });
  }

  storeSelects() {
    this.showCreateConfigureEditor$ = this.store.pipe(select(showEditorConfigureCreate));
    this.isLoading$ = this.store.pipe(select(isLoadingExclusion));
    this.exclusionTypeData$ = this.store.pipe(select(getExclusionTypeData));
    this.getConfigureTransactionData$ = this.store.pipe(select(getConfigureTransactionDataEdit));
    this.configureTransactionData = this.store.pipe(select(getConfigureTransactionData));
  }

  storeDispatches() {
  }

  onAdd() {
    this.store.dispatch(new ShowEditorConfigureTransactionCreate())
    this.store.dispatch(new LoadExclusionTypeData())
  }

  onRunIconConfigureClicked(rowId: number) {
    this.configureeditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.configureeditor.data = result;
        this.configureeditor.reset();
        this.store.dispatch(new LoadExclusionTypeData())
        this.store.dispatch(new LoadExclusionItemTypeData(result.item_type))
        this.store.dispatch(new ShowEditorConfigureTransactionCreate());
      }
    );
  }

  getRoConfigData$(rowId: number): Observable<IConfigureTransaction> {
    return this.configureTransactionData.pipe(
      map(d => d.filter(v => v.exclusion_det_id === rowId)),
      map(e => e.shift()))
  }

  getRowData$(rowId: number): Observable<IConfigureTransaction> {
    return this.configureTransactionData.pipe(
      map(d => d.filter(v => v.exclusion_det_id === rowId)),
      map(e => e.shift()))
  }

  onRefresh() {
    this.store.dispatch(new LoadConfigureTransactionData(this.exclusionId));
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onSubmit(){

  }

  onCancel() {
    this.router.navigate([STANDARD_ROUTES.exclusionTrasanction]);
  }

  reset() {
    this.service.f.reset();
    this.service.init(this.data);
  }

  search() {
    let filterBy: string = '';
    let searchString: string = '';
    if (this.searchInput) {
      searchString = this.searchInput.nativeElement.value;
    }

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.configureTransactionDataGrid) {
      this.service.search(
        this.configureTransactionDataGrid,
        searchString,
        filterBy
      );
    }
  }

  onDeleteIconClicked(row_id:number){
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteTransactionConfigure({exclusion_det_id: row_id}));
          this.store.dispatch(new LoadConfigureTransactionData(this.exclusionId));
        }
      });
  }
}
