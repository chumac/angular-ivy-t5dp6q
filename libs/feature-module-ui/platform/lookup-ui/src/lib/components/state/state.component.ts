import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IState, INationality} from '@nutela/models/platform/lookup';
import { StateEditorComponent } from './state-editor/state-editor.component';
import { Store, select } from '@ngrx/store';
import { ILookupState } from '../../store';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { LoadStateData, getStates, showEditorState, ShowEditorState, DeleteState, HideEditorState, getNation, LoadNation, ClearState, isProcessingState, ProcessingState } from '../../store';
import { map, take } from 'rxjs/operators';
import { ISelectOption } from '@nutela/models/core-data';
import { UtilService } from '@nutela/core-services';
import { StateService } from '../../components/services';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'x365-fm-plf-hrf-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  public data: any[];

  public stateData$: Observable<IState[]>;
  public nationData$: Observable<ISelectOption[]>;
  public country=[];
  public country_id:number;
  public show:boolean=false;

  dropDownFilterValue:string;
 @ViewChild('stateGrid') stateGrid : IgxGridComponent;

   @ViewChild('editor') editor: StateEditorComponent;


  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private store: Store<ILookupState>,
  private dialogBoxService: DialogBoxService,
  private utilService: UtilService,
  public stateService: StateService) {
    titleService.setTitle(
      `${'Staff Categories'}${this.partialDocumentTitle}`
    );
  }
  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
  this.store.dispatch(new LoadNation());
  this.store.dispatch(new ClearState());
  this.store.dispatch(new ProcessingState());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorState));
    this.isProcessing$=this.store.pipe(select(isProcessingState));
    this.stateData$= this.store.pipe(select(getStates));
    this.nationData$= this.store.pipe(select(getNation));
    this.nationData$.subscribe(result=>{
      this.country=this.utilService.transformToSelectDataList(result,"nationality_id","description");
    });
  }

  onCountrySelect($event){
    this.store.dispatch(new LoadStateData({countryId:$event.value}));
    console.log('value',$event.value);
    this.country_id=$event.value;
    this.show=true;
    this.stateService.country_id=this.country_id;
  }

  getRowStateData$(rowId: number): Observable<IState> {
    console.log('data row', rowId);
    return this.stateData$.pipe(
      map(d => d.filter(v => v.state_id=== rowId)),
      map(e => e.shift()))
  }


  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowStateData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorState());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteState({countryId:this.country_id,recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorState());
  }

  onAdd(){
    this.stateService.showEditor();
  }

  onRefreshedButtonClicked(){
    this.stateService.refresh();
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.stateGrid) {
      if (filterValue) {
        this.stateGrid.clearFilter();
        this.stateGrid.filteringLogic = FilteringLogic.Or;
        this.stateGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.stateGrid.clearFilter();
        this.stateGrid.filteringLogic = FilteringLogic.Or;
        this.stateGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }

}
