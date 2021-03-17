import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IgxGridComponent } from 'igniteui-angular';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { IEmployeesProfileState } from '../../../../store/root';
import { Title } from '@angular/platform-browser';
import { SeparationService } from './separations.service';
import { Observable } from 'rxjs';
import { SeparationEditorComponent } from './separation-editor/separation-editor.component';
import { ISeparation } from '@nutela/models/workforce/employee-profiles';
import { showEditorSeparationTransaction, getSeparationTransaction, isLoadingSeparationTransaction,
         LoadSeparationTransaction, LoadingSeparationTransaction,HideEditorSeparationTransaction,
         ShowEditorSeparationTransaction, LoadEmployeeList, LoadStatus, LoadReason, LoadAllowance,
         LoadCurrency, getStatusSeparationTransaction, DeleteSeparationTransaction, NotProcessingSeparationTransaction, HideViewerSeparationTransaction, ShowViewerSeparationTransaction, showViewerSeparationTransaction} from '../../../../store/hr-transactions/separation';
import { ISelectOption } from '@nutela/models/core-data';
import { map, take } from 'rxjs/operators';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { SeparationViewerComponent } from './separation-viewer';

@Component({
  selector: 'x365-fm-workforce-separations',
  templateUrl: './separations.component.html',
  styleUrls: ['./separations.component.scss'],
  providers: [SeparationService],
})
export class SeparationsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$:Observable<boolean>;
  status$: Observable<ISelectOption[]>;

  public data: any[];

  public separationData$: Observable<ISeparation[]>;

  @ViewChild('editor') editor: SeparationEditorComponent;
  @ViewChild('viewer') viewer: SeparationViewerComponent;

  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('filterStatus') filterStatus: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild("separationGrid") separationGrid: IgxGridComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private utilService: UtilService,
    private titleService: Title,
    public service: SeparationService,
    private store: Store<IEmployeesProfileState>,
    private dialogBoxService: DialogBoxService,
  ) {
    titleService.setTitle(`${'Separation Transaction'}${this.partialDocumentTitle}`)
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadSeparationTransaction());
    this.store.dispatch(new LoadingSeparationTransaction());

    //drop downs

    this.store.dispatch(new LoadEmployeeList());
    this.store.dispatch(new LoadStatus());
    this.store.dispatch(new LoadReason());
    this.store.dispatch(new LoadAllowance());
    this.store.dispatch(new LoadCurrency());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorSeparationTransaction));
    this.showViewer$ = this.store.pipe(select(showViewerSeparationTransaction));
    this.separationData$ = this.store.pipe(select(getSeparationTransaction));
    this.isLoading$=this.store.pipe(select(isLoadingSeparationTransaction));
    this.status$=this.store.pipe(select(getStatusSeparationTransaction));
  }

  getRowData$(rowId: number): Observable<ISeparation> {
    return this.separationData$.pipe(
      map(d => d.filter(v => v.separation_id === rowId)),
      map(e => e.shift()))
  }


  getSeparationByStatusData(records:number): ISeparation[] {
    let arr: ISeparation[];
      this.separationData$.subscribe(res=>{
        arr=res.filter(v => v.status === records);
          })
    return arr;
  }

  // onStatus($event){
  //   console.log($event);
  //   console.log('selected',this.filterStatus);
  //   console.log('list',this.getSeparationByStatusData($event.value));
  //   this.store.dispatch(new LoadSeparationTransactionSuccess(this.getSeparationByStatusData($event.value)));
  // }

  onStatus($event){
    const searchString = <string>$event.label;
    const filterBy = "status_meaning";
    if (this.separationGrid) {
      if(searchString === "All"){
        this.separationGrid.clearFilter();
      }
      else{
      this.service.search(this.separationGrid, searchString, filterBy);
      }
    }
  }

  search() {
    let filterBy: string = '';
    const searchString = this.searchInput.nativeElement.value;

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.separationGrid) {
      this.service.search(this.separationGrid, searchString, filterBy);
    }
  }

  onAdd(){
    this.store.dispatch(new ShowEditorSeparationTransaction());
  }

  onRefresh(){
    this.store.dispatch(new LoadSeparationTransaction());
    this.store.dispatch(new ShowToast({title: null, message: `Separation data was refreshed successfully.`, type: ToastTypes.SUCCESS}),)
  }

  getSeparationTransactionData$(rowId: number): Observable<ISeparation> {
    return this.separationData$.pipe(
      map(d => d.filter(v => v.separation_id === rowId)),
      map(e => e.shift()))
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe(result => {
        console.log('view data: ', result)
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerSeparationTransaction());
        this.store.dispatch(new NotProcessingSeparationTransaction());
      }
      );
  }

  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getSeparationTransactionData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorSeparationTransaction());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteSeparationTransaction({recordId: row_id}));
        }
      });
  }

  // hasDocument(rowId: number): boolean{
  //   let status=false;
  //   this.getSeparationTransactionData$(rowId)
  //   .subscribe((result) => {
  //     if(result.ResignationInfo !== null){
  //       // if (result.ResignationInfo.doc_url !== null) {
  //       //   status = true;
  //       // } else {
  //       //   status = false;
  //       // }
  //     }
  //     else{
  //       status = false;
  //     }
  //     }

  //   );
  //   return status;
  // }

  // onDownloadIconClicked(rowId: number) {
  //   this.getSeparationTransactionData$(rowId).pipe(take(1))
  //     .subscribe((result) => {
  //         if (result.ResignationInfo.doc_url === null || result.ResignationInfo.doc_url === '') {
  //           this.store.dispatch(new ShowToast({title: 'Document not Available', message: `There is no document attached for download.`, type: ToastTypes.INFO}));
  //         } else {
  //           // this.store.dispatch(new LoadInlineDocumentFamily({recordId: rowId, isApproved: true, employeeId:this.employeeId}));
  //         }
  //       }
  //     );
  // }

  onCancelEditor() {
     this.store.dispatch(new HideEditorSeparationTransaction());
  }
  onCancelViewer() {
    this.store.dispatch(new HideViewerSeparationTransaction());
  }
}
