import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IProfessionalAwards } from '@nutela/models/platform/lookup';
import { LoadProfessionalAwardsData, getProfessionalAwards, showEditorProfessionalAwards, HideEditorProfessionalAwards, ShowEditorProfessionalAwards, DeleteProfessionalAwards, isProcessingProfessionalAwards, ProcessingProfessionalAwards } from '../../store';
import { map, take } from 'rxjs/operators';
import { ProfesionalAwardsEditorComponent } from './profesional-awards-editor/profesional-awards-editor.component';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { ProfessionalAwardsService } from '../services';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { ILookupState } from '../../store';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'x365-fm-plf-hrf-professional-awards',
  templateUrl: './professional-awards.component.html',
  styleUrls: ['./professional-awards.component.scss']
})
export class ProfessionalAwardsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;

  public data: any[];

  public professionalAwardsData$: Observable<IProfessionalAwards[]>;
  dropDownFilterValue:string;
  @ViewChild('awardGrid') awardGrid: IgxGridComponent;


   @ViewChild('editor') editor: ProfesionalAwardsEditorComponent;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private store: Store<ILookupState>,
  private dialogBoxService: DialogBoxService,
  public professionalAward: ProfessionalAwardsService) {
    titleService.setTitle(
      `${'Professional Awards'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadProfessionalAwardsData());
    this.store.dispatch(new ProcessingProfessionalAwards());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorProfessionalAwards));
    this.professionalAwardsData$= this.store.pipe(select(getProfessionalAwards));
    this.isProcessing$=this.store.pipe(select(isProcessingProfessionalAwards))
  }

  getRowProfessionalAwardsData$(rowId: number): Observable<IProfessionalAwards> {
    console.log('data row', rowId);
    return this.professionalAwardsData$.pipe(
      map(d => d.filter(v => v.proaward_id=== rowId)),
      map(e => e.shift()))
  }


  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowProfessionalAwardsData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorProfessionalAwards());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteProfessionalAwards({recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorProfessionalAwards());
  }

  onAdd(){
    this.professionalAward.showEditor();
  }

  onRefreshedButtonClicked(){
    this.professionalAward.refresh();
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.awardGrid) {
      if (filterValue) {
        this.awardGrid.clearFilter();
        this.awardGrid.filteringLogic = FilteringLogic.Or;
        this.awardGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.awardGrid.clearFilter();
        this.awardGrid.filteringLogic = FilteringLogic.Or;
        this.awardGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}
