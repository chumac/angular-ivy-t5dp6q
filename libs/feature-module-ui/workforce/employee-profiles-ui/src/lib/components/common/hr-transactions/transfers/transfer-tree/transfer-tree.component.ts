import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { TransferTreeService } from './transfer-tree.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../../../store/root';
import { Observable } from 'rxjs';
import { getTreeDetailsTransfer, isLoadingTransfer, LoadingTransfer, LoadTreeDetailsTransfer,
         LoadPicked, LoadSpecificStructureTransfer, LoadCostCenterTransfer } from '../../../../../store/hr-transactions/transfer';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IgxGridComponent } from 'igniteui-angular';
import { TransferEditorService } from '../transfer-editor/transfer-editor.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-workforce-transfer-tree',
  templateUrl: './transfer-tree.component.html',
  styleUrls: ['./transfer-tree.component.scss'],
  providers: [TransferTreeService, TransferEditorService]
})
export class TransferTreeComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Output() cancelClick = new EventEmitter<any>();


  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild("detailsGrid") detailsGrid: IgxGridComponent;

  public treeDetails$: Observable<any[]>;
  public isLoading$: Observable<boolean>;

  constructor(
    public service: TransferTreeService,
    public fs: TransferEditorService,
    public utilService: UtilService,
    private store: Store<IEmployeesProfileState>,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.treeDetails$ = this.store.pipe(select(getTreeDetailsTransfer));
    this.isLoading$ = this.store.pipe(select(isLoadingTransfer));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingTransfer());
    this.store.dispatch(new LoadTreeDetailsTransfer({ structureId: 0 }));
  }


  onExpandClicked(rowId) {
    this.treeDetails$.pipe(take(1)).subscribe(
      res => {
        if (res) {
          this.store.dispatch(new LoadingTransfer());
          this.store.dispatch(new LoadTreeDetailsTransfer({ structureId: rowId }));
        }
      });
    // console.log('test',JSON.stringify(this.service.detail)==JSON.stringify(arr));
  }

  onSelect(rowId) {
    this.treeDetails$.subscribe(
      res => {
        if (res) {
          res.forEach(element => {
            if (element.structure_id === rowId) {
              console.log('', res[res.indexOf(element)]);
              this.store.dispatch(new LoadPicked({ locationId: element.structure_type_id, locationDetailsId: element.structure_id }));
              this.store.dispatch(new LoadSpecificStructureTransfer({ Id: element.structure_type_id }));
              this.store.dispatch(new LoadCostCenterTransfer({ analysis_det_id: element.structure_id }));
            }
          });
        }
      });
    // this.fs.show = false;
    this.onCancel();
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

    if (this.detailsGrid) {
      this.service.search(this.detailsGrid, searchString, filterBy);
    }
  }

  onCancel(){
  this.cancelClick.emit();
  this.store.dispatch(new LoadTreeDetailsTransfer({structureId:0}));
  }

  onMoveUp() {
    this.treeDetails$.pipe(take(1)).subscribe(
      res => {
        if (res) {
          this.store.dispatch(new LoadingTransfer());
          this.store.dispatch(new LoadTreeDetailsTransfer({ structureId: res[0].back_to }));
        }
      });
    // this.service.move.pop();
    // this.service.arr = [...this.service.move];
    // if(this.service.move.length !== 0){
    //   this.store.dispatch(new LoadingTransfer());
    //   this.store.dispatch(new LoadTreeDetailsTransfer({structureId:this.service.arr.pop()}));
    // }
  }

  onTopLevelClicked() {
    this.store.dispatch(new LoadTreeDetailsTransfer({ structureId: 0 }));
  }

}
