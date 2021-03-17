import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { IEducationalInstitution } from '@nutela/models/platform/lookup';
import { EducationalInstitutionsEditorComponent } from './educational-institutions-editor/educational-institutions-editor.component';
import { Store, select } from '@ngrx/store';
import { LoadEducationalInstitution, getEducationalInstitution, ShowEditorEducationalInstitution, HideEditorEducationalInstitution, showEditorEducationalInstitution, DeleteEducationalInstitution, isProcessingEducationalInstitution, ProcessingEducationalInstitution, getNationEducationalInstitution, LoadNationEducationalInstitution, LoadStateEducationalInstitution, getProfessionalInstitution, LoadProfessionalInstitution } from '../../store';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes, SwitchComponent } from '@nutela/shared/ui';
import { EducationalInstitutionService } from '../services';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { ILookupState } from '../../store';
import { Title } from '@angular/platform-browser';
import { ISelectOption } from '@nutela/models/core-data';
import { UtilService } from '@nutela/core-services';


@Component({
  selector: 'x365-fm-plf-hrf-educational-institutions',
  templateUrl: './educational-institutions.component.html',
  styleUrls: ['./educational-institutions.component.scss']
})
export class EducationalInstitutionsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  public nationData$: Observable<ISelectOption[]>;

  public data: any[];
  public country = [];
  public countryIds= [];
  public show=true;

  public educationInstitutionData$: Observable<IEducationalInstitution[]>;
  public professionalInstitutionData$: Observable<IEducationalInstitution[]>;
  dropDownFilterValue:string;
  @ViewChild('educationalInstitutionGrid') educationalInstitutionGrid: IgxGridComponent;
  @ViewChild('professionalInstitutionGrid') professionalInstitutionGrid: IgxGridComponent;

   @ViewChild('editor') editor: EducationalInstitutionsEditorComponent;
   @ViewChild('switch') switch: SwitchComponent;


              constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,
              private store: Store<ILookupState>,
              private utilService: UtilService,
              private dialogBoxService: DialogBoxService,
              public educationalInstitutionService: EducationalInstitutionService) {
                titleService.setTitle(
                  `${'Educational Institution'}${this.partialDocumentTitle}`
                );
              }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  getCountryId(name:string) : number{
    var id;
    this.countryIds.forEach((nations)=>{
      if(nations.label === name){
        id = nations.value;
      }
    });
    return id;
  }

  storeDispatches() {
    this.store.dispatch(new ProcessingEducationalInstitution());
    this.store.dispatch(new LoadNationEducationalInstitution());
    this.store.dispatch(new LoadProfessionalInstitution());
  }

  onCountrySelect($event){
    this.store.dispatch(new ProcessingEducationalInstitution());
    this.store.dispatch(new LoadEducationalInstitution({countryName:$event.value}));
    this.store.dispatch(new LoadStateEducationalInstitution({countryId:this.getCountryId($event.value)}));
    console.log('id', this.getCountryId($event.value));
    this.show=false;
    this.educationalInstitutionService.countryName = $event.value;
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorEducationalInstitution));
    this.educationInstitutionData$= this.store.pipe(select(getEducationalInstitution));
    this.professionalInstitutionData$= this.store.pipe(select(getProfessionalInstitution));
    this.isProcessing$= this.store.pipe(select(isProcessingEducationalInstitution));
    this.nationData$= this.store.pipe(select(getNationEducationalInstitution));
    this.nationData$.subscribe(result=>{
      this.country=this.utilService.transformToSelectDataList(result,"description","description");
      this.countryIds=this.utilService.transformToSelectDataList(result,"nationality_id","description");
    });
  }

  getRowEducationalInstitutionData$(rowId: number): Observable<IEducationalInstitution> {
    console.log('data row', rowId);
    return this.educationInstitutionData$.pipe(
      map(d => d.filter(v => v.institution_id=== rowId)),
      map(e => e.shift()))
  }


  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowEducationalInstitutionData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorEducationalInstitution());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteEducationalInstitution({recordId: row_id, countryName:this.educationalInstitutionService.countryName}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorEducationalInstitution());
  }

  onAdd(){
    this.educationalInstitutionService.showEditor();
  }

  onRefreshedButtonClicked(){
    this.educationalInstitutionService.refresh();
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.educationalInstitutionGrid) {
      if (filterValue) {
        this.educationalInstitutionGrid.clearFilter();
        this.educationalInstitutionGrid.filteringLogic = FilteringLogic.Or;
        this.educationalInstitutionGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.educationalInstitutionGrid.clearFilter();
        this.educationalInstitutionGrid.filteringLogic = FilteringLogic.Or;
        this.educationalInstitutionGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
    else if(this.professionalInstitutionGrid){
      if (filterValue) {
        this.professionalInstitutionGrid.clearFilter();
        this.professionalInstitutionGrid.filteringLogic = FilteringLogic.Or;
        this.professionalInstitutionGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.professionalInstitutionGrid.clearFilter();
        this.professionalInstitutionGrid.filteringLogic = FilteringLogic.Or;
        this.professionalInstitutionGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }

    }
  }
}
