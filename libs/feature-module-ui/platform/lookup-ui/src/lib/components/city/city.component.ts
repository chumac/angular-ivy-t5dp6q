import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ICity } from '@nutela/models/platform/lookup';
import { ISelectOption } from '@nutela/models/core-data';
import { CityEditorComponent } from './city-editor/city-editor.component';
import { Store, select } from '@ngrx/store';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { UtilService } from '@nutela/core-services';
import { LoadNationData, ClearCity, showEditorCity, getCity, getNationData,
         getStateData, ShowEditorCity, DeleteCity, HideEditorCity, LoadState, LoadCityData, ClearStateCity, isProcessingCity, ProcessingCity } from '../../store';
import { map, take } from 'rxjs/operators';
import { CityService } from '../services';
import { ILookupState } from '../../store';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'x365-fm-plf-hrf-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  public show:boolean=false;

  public data: any[];
  dropDownFilterValue:string;
  @ViewChild('cityGrid') cityGrid : IgxGridComponent;

  public cityData$: Observable<ICity[]>;
  public nationData$: Observable<ISelectOption[]>;
  public stateData$: Observable<ISelectOption[]>;
  public country=[];
  public state=[];
  public country_id:number;
  public state_id:number;

   @ViewChild('editor') editor: CityEditorComponent;

  constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,private store: Store<ILookupState>,
              private dialogBoxService: DialogBoxService,
              private utilService: UtilService,
              public cityService: CityService,) {
                titleService.setTitle(
                  `${'City'}${this.partialDocumentTitle}`
                );
              }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
  this.store.dispatch(new LoadNationData());
  this.store.dispatch(new ProcessingCity());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorCity));
    this.isProcessing$=this.store.pipe(select(isProcessingCity));
    this.cityData$ = this.store.pipe(select(getCity));
    this.stateData$= this.store.pipe(select(getStateData));
    this.stateData$.subscribe(result=>{
      this.state=this.utilService.transformToSelectDataList(result,"state_id","description");
    });
    this.nationData$= this.store.pipe(select(getNationData));
    this.nationData$.subscribe(result=>{
      this.country=this.utilService.transformToSelectDataList(result,"nationality_id","description");
    });
  }

  onCountrySelect($event){
    this.store.dispatch(new ClearCity());
    this.store.dispatch(new ClearStateCity());
    this.store.dispatch(new LoadState({countryId:$event.value}));
    console.log('value',$event.value);
    this.country_id=$event.value;
  }

  onStateSelect($event){
    this.store.dispatch(new LoadCityData({stateId:$event.value}));
    console.log('value',$event.value);
    this.state_id=$event.value;
    this.show=true;
    this.cityService.state_id=this.state_id;
  }

  getRowCityData$(rowId: number): Observable<ICity> {
    console.log('data row', rowId);
    return this.cityData$.pipe(
      map(d => d.filter(v => v.city_id=== rowId)),
      map(e => e.shift()))
  }


  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowCityData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorCity());
      }
      );
  }

  onAdd(){
    this.cityService.showEditor();
  }

  onRefreshedButtonClicked(){
    this.cityService.refresh();
  }

   onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteCity({stateId:this.state_id,cityId: row_id}));
        }
      });
   }

  onCancelEditor() {
     this.store.dispatch(new HideEditorCity());
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.cityGrid) {
      if (filterValue) {
        this.cityGrid.clearFilter();
        this.cityGrid.filteringLogic = FilteringLogic.Or;
        this.cityGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.cityGrid.clearFilter();
        this.cityGrid.filteringLogic = FilteringLogic.Or;
        this.cityGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}
