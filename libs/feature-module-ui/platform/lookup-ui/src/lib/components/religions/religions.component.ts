import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IReligions } from '@nutela/models/platform/lookup';
import { ReligionsEditorComponent } from './religions-editor/religions-editor.component';
import { Store, select } from '@ngrx/store';
import { LoadReligionsData, showEditorReligions, getReligions, ShowEditorReligions, HideEditorReligions, DeleteReligions, isProcessingReligions, ProcessingReligions } from '../../store';
import { map, take } from 'rxjs/operators';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { ReligionService } from '../services';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { ILookupState } from '../../store';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'x365-fm-plf-hrf-religions',
  templateUrl: './religions.component.html',
  styleUrls: ['./religions.component.scss']
})
export class ReligionsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  public data: any[];

  public religionsData$: Observable<IReligions[]>;
  dropDownFilterValue:string;
  @ViewChild('religionGrid') religionGrid: IgxGridComponent;


   @ViewChild('editor') editor: ReligionsEditorComponent;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private store: Store<ILookupState>,
  private dialogBoxService: DialogBoxService,
  public religionService: ReligionService) {
    titleService.setTitle(
      `${'Religions'}${this.partialDocumentTitle}`
    );
  }


  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadReligionsData());
    this.store.dispatch(new ProcessingReligions());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorReligions));
    this.religionsData$= this.store.pipe(select(getReligions));
    this.isProcessing$=this.store.pipe(select(isProcessingReligions))
  }

  getRowReligionsData$(rowId: number): Observable<IReligions> {
    console.log('data row', rowId);
    return this.religionsData$.pipe(
      map(d => d.filter(v => v.religion_id=== rowId)),
      map(e => e.shift()))
  }


  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowReligionsData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorReligions());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteReligions({recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorReligions());
  }

  onAdd(){
    this.religionService.showEditor();
  }

  onRefreshedButtonClicked(){
    this.religionService.refresh();
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.religionGrid) {
      if (filterValue) {
        this.religionGrid.clearFilter();
        this.religionGrid.filteringLogic = FilteringLogic.Or;
        this.religionGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.religionGrid.clearFilter();
        this.religionGrid.filteringLogic = FilteringLogic.Or;
        this.religionGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }

}
