import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { IReInstate } from '@nutela/models/workforce/employee-profiles';
import { UtilService } from '@nutela/core-services';
import { Title } from '@angular/platform-browser';
import { ReInstateService } from './re-instate.service';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../../store';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { LoadReInstateTransaction, LoadingReInstateTransaction, showEditorReInstateTransaction,
         getReInstateTransaction, isLoadingReInstateTransaction, ShowEditorReInstateTransaction,
         HideEditorReInstateTransaction, LoadEmployeeList, LoadRecordCategory } from '../../../../store/hr-transactions/re-instate';
import { ShowToast } from '@nutela/store/shared';
import { map, take } from 'rxjs/operators';
import { ToastTypes } from '@nutela/shared/app-global';
import { IgxGridComponent } from 'igniteui-angular';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { ReInstateEditorComponent } from './re-instate-editor/re-instate-editor.component';

@Component({
  selector: 'x365-fm-workforce-re-instate',
  templateUrl: './re-instate.component.html',
  styleUrls: ['./re-instate.component.scss'],
  providers: [ReInstateService]
})
export class ReInstateComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isLoading$:Observable<boolean>;

  public data: any[];

  public reInstateData$: Observable<IReInstate[]>;

  @ViewChild('editor') editor: ReInstateEditorComponent;

  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild("reInstateGrid") reInstateGrid: IgxGridComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private utilService: UtilService,
    private titleService: Title,
    public service: ReInstateService,
    private store: Store<IEmployeesProfileState>,
    private dialogBoxService: DialogBoxService,
  ) {
    titleService.setTitle(`${'ReInstate Transaction'}${this.partialDocumentTitle}`)
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadReInstateTransaction());
    this.store.dispatch(new LoadingReInstateTransaction());
    this.store.dispatch(new LoadEmployeeList());
    this.store.dispatch(new LoadRecordCategory());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorReInstateTransaction));
    this.reInstateData$ = this.store.pipe(select(getReInstateTransaction));
    this.isLoading$=this.store.pipe(select(isLoadingReInstateTransaction));
  }

  search() {
    let filterBy: string = '';
    const searchString = this.searchInput.nativeElement.value;

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.reInstateGrid) {
      this.service.search(this.reInstateGrid, searchString, filterBy);
    }
  }

  onAdd(){
    this.store.dispatch(new ShowEditorReInstateTransaction());
  }

  onRefresh(){
    this.store.dispatch(new LoadReInstateTransaction());
    this.store.dispatch(new ShowToast({title: null, message: `ReInstate data was refreshed successfully.`, type: ToastTypes.SUCCESS}),)
  }

  getReInstateTransactionData$(rowId: number): Observable<IReInstate> {
    return this.reInstateData$.pipe(
      map(d => d.filter(v => v.employee_id === rowId)),
      map(e => e.shift()))
  }

  onReInstateIconClicked(row_id: number) {
    this.editor.data = null;
    this.getReInstateTransactionData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorReInstateTransaction());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          // this.store.dispatch(new DeleteReInstateTransaction({recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorReInstateTransaction());
  }
}
