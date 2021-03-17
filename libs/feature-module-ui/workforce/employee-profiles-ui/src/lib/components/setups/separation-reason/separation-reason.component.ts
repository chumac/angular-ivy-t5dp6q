import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ISeparationReasons } from '@nutela/models/workforce/employee-profiles';
import { isLoadingSeparationReasonSetup, showEditorSeparationReasonSetup, getSeparationReasonSetupData, isProcessingSeparationReasonSetup } from '../../../store/setups/separation-reason/separation-reason.selectors';
import { UtilService } from '@nutela/core-services';
import { Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../store/root';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { IgxGridComponent } from 'igniteui-angular';
import { SeparationReasonService } from './separation-reason.service';
import { LoadDataSeparationReasonSetup, LoadingSeparationReasonSetup, HideEditorSeparationReasonSetup, ShowEditorSeparationReasonSetup, DeleteDataSeparationReasonSetup } from '../../../store/setups/separation-reason';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { map, take } from 'rxjs/operators';
import { SeparationReasonEditorComponent } from './separation-reason-editor/separation-reason-editor.component';

@Component({
  selector: 'x365-fm-workforce-separation-reason',
  templateUrl: './separation-reason.component.html',
  styleUrls: ['./separation-reason.component.scss'],
  providers:[SeparationReasonService]
})
export class SeparationReasonComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  isLoading$ :Observable<boolean>;

  public data: any[];

  public reasonsData$: Observable<ISeparationReasons[]>;
  @ViewChild('editor') editor: SeparationReasonEditorComponent;

  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild("separationReasonGrid") separationReasonGrid: IgxGridComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private utilService: UtilService,
    private titleService: Title,
    public service: SeparationReasonService,
    private store: Store<IEmployeesProfileState>,
    private dialogBoxService: DialogBoxService,
  ) {
    titleService.setTitle(`${'Separation Reasons'}${this.partialDocumentTitle}`)
  }
  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataSeparationReasonSetup());
    this.store.dispatch(new LoadingSeparationReasonSetup());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorSeparationReasonSetup));
    this.reasonsData$ = this.store.pipe(select(getSeparationReasonSetupData));
    this.isProcessing$=this.store.pipe(select(isProcessingSeparationReasonSetup));
    this.isLoading$ = this.store.pipe(select(isLoadingSeparationReasonSetup));
  }

  getSeparationReasonsData$(rowId: number): Observable<ISeparationReasons> {
    console.log('data row', rowId);
    return this.reasonsData$.pipe(
      map(d => d.filter(v => v.status_id === rowId)),
      map(e => e.shift()))
  }



  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getSeparationReasonsData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorSeparationReasonSetup());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataSeparationReasonSetup({recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorSeparationReasonSetup());
  }

  search() {
    let filterBy: string = '';
    const searchString = this.searchInput.nativeElement.value;

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.separationReasonGrid) {
      this.service.search(this.separationReasonGrid, searchString, filterBy);
    }
  }

  onAdd(){
    this.store.dispatch(new ShowEditorSeparationReasonSetup());
  }

  onRefresh(){
    this.store.dispatch(new LoadDataSeparationReasonSetup());
    this.store.dispatch(new ShowToast({title: null, message: `Separation data was refresh successfully.`, type: ToastTypes.SUCCESS}),)
  }

}
