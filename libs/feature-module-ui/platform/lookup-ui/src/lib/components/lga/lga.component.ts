import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ILga } from '@nutela/models/platform/lookup';
import { Observable } from 'rxjs';
import { ISelectOption } from '@nutela/models/core-data';
import { LgaEditorComponent } from './lga-editor/lga-editor.component';
import { Store, select } from '@ngrx/store';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { UtilService } from '@nutela/core-services';
import { getStateLga, LoadNationLga, showEditorLga, getLga, ClearLga, LoadLgaState,
         LoadLgaData, getNationLga, ShowEditorLga, HideEditorLga, DeleteLga, isProcessingLga, ProcessingLga  } from '../../store';
import { map, take } from 'rxjs/operators';
import { LgaService } from '../services';
import { ILookupState } from '../../store';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'x365-fm-plf-hrf-lga',
  templateUrl: './lga.component.html',
  styleUrls: ['./lga.component.scss']
})
export class LgaComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  public data: any[];

  dropDownFilterValue:string;
 @ViewChild('lgaGrid') lgaGrid : IgxGridComponent;

  public lgaData$: Observable<ILga[]>;
  public nationData$: Observable<ISelectOption[]>;
  public stateData$: Observable<ISelectOption[]>;
  public country=[];
  public state=[];
  public country_id:number;
  public state_id:number;
  public show:boolean=false;

   @ViewChild('editor') editor: LgaEditorComponent;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private store: Store<ILookupState>,
  private dialogBoxService: DialogBoxService,
  private utilService: UtilService,
  public lgaService: LgaService) {
    titleService.setTitle(
      `${'LGA'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
  this.store.dispatch(new LoadNationLga());
  this.store.dispatch(new ProcessingLga());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorLga));
    this.isProcessing$=this.store.pipe(select(isProcessingLga))
    this.lgaData$ = this.store.pipe(select(getLga));
    this.stateData$= this.store.pipe(select(getStateLga));
    this.stateData$.subscribe(result=>{
      this.state=this.utilService.transformToSelectDataList(result,"state_id","description");
    });
    this.nationData$= this.store.pipe(select(getNationLga));
    this.nationData$.subscribe(result=>{
      this.country=this.utilService.transformToSelectDataList(result,"nationality_id","description");
    });
  }

  onCountrySelect($event){
    this.store.dispatch(new ClearLga());
    this.store.dispatch(new LoadLgaState({countryId:$event.value}));
    console.log('value',$event.value);
    this.country_id=$event.value;
    this.lgaService.country_id=this.country_id;
  }

  onStateSelect($event){
    this.store.dispatch(new LoadLgaData({stateId:$event.value}));
    console.log('value',$event.value);
    this.state_id=$event.value;
    this.show=true;
    this.lgaService.state_id=this.state_id;
  }

  getRowLgaData$(rowId: number): Observable<ILga> {
    console.log('data row', rowId);
    return this.lgaData$.pipe(
      map(d => d.filter(v => v.lga_id=== rowId)),
      map(e => e.shift()))
  }


  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowLgaData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorLga());
      }
      );
  }

   onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteLga({stateId:this.state_id,LgaId: row_id}));
        }
      });
   }

  onCancelEditor() {
     this.store.dispatch(new HideEditorLga());
  }

  onAdd(){
    this.lgaService.showEditor();
  }

  onRefreshedButtonClicked(){
    this.lgaService.refresh();
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.lgaGrid) {
      if (filterValue) {
        this.lgaGrid.clearFilter();
        this.lgaGrid.filteringLogic = FilteringLogic.Or;
        this.lgaGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.lgaGrid.clearFilter();
        this.lgaGrid.filteringLogic = FilteringLogic.Or;
        this.lgaGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}
