import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { INationality } from '@nutela/models/platform/lookup';
import { NationalityEditorComponent } from './nationality-editor/nationality-editor.component';
import { Store, select } from '@ngrx/store';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { LoadNationalityData, showEditorNationality, getNationality,
         ShowEditorNationality, DeleteNationality, HideEditorNationality,
         isProcessingNationality,
         ProcessingNationality,
         ILookupState} from '../../store';
import { map, take } from 'rxjs/operators';
import { NationalityService } from '../services';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'x365-fm-plf-hrf-nationality',
  templateUrl: './nationality.component.html',
  styleUrls: ['./nationality.component.scss']
})
export class NationalityComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  public data: any[];

  public nationalityData$: Observable<INationality[]>;
  dropDownFilterValue:string;
 @ViewChild('nationalityGrid') nationalityGrid: IgxGridComponent;

   @ViewChild('editor') editor: NationalityEditorComponent;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private store: Store<ILookupState>,
  private dialogBoxService: DialogBoxService,
  public nationalityService: NationalityService) {
    titleService.setTitle(
      `${'Nationalities'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadNationalityData());
    this.store.dispatch(new ProcessingNationality());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorNationality));
    this.nationalityData$= this.store.pipe(select(getNationality));
    this.isProcessing$=this.store.pipe(select(isProcessingNationality))
  }

  getRowNationalityData$(rowId: number): Observable<INationality> {
    console.log('data row', rowId);
    return this.nationalityData$.pipe(
      map(d => d.filter(v => v.nationality_id=== rowId)),
      map(e => e.shift()))
  }


  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowNationalityData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorNationality());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteNationality({recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorNationality());
  }

  onAdd(){
    this.nationalityService.showEditor();
  }

  onRefreshedButtonClicked(){
    this.nationalityService.refresh();
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.nationalityGrid) {
      if (filterValue) {
        this.nationalityGrid.clearFilter();
        this.nationalityGrid.filteringLogic = FilteringLogic.Or;
        this.nationalityGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.nationalityGrid.clearFilter();
        this.nationalityGrid.filteringLogic = FilteringLogic.Or;
        this.nationalityGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}
