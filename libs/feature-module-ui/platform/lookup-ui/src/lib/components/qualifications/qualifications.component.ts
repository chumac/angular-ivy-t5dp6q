import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IQualifications } from '@nutela/models/platform/lookup';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { map, take } from 'rxjs/operators';
import { QualificationsEditorComponent } from './qualifications-editor/qualifications-editor.component';
import { showEditorQualification, LoadQualificationData, getQualification, ShowEditorQualification, DeleteQualification, HideEditorQualification, isProcessingQualification, ProcessingQualification } from '../../store';
import { QualificationsService } from '../services';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { ILookupState } from '../../store';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'x365-fm-plf-hrf-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.scss']
})
export class QualificationsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  public data: any[];


  public qualificationData$: Observable<IQualifications[]>;
  dropDownFilterValue:string;
  @ViewChild('qualificationGrid') qualificationGrid: IgxGridComponent;

  @ViewChild('editor') editor: QualificationsEditorComponent;

  constructor(@Inject('partialDocumentTitle')
  private partialDocumentTitle: string,
  private titleService: Title,
  private store: Store<ILookupState>,
  private dialogBoxService: DialogBoxService,
  public qualification: QualificationsService) {
    titleService.setTitle(
      `${'Qualifications'}${this.partialDocumentTitle}`
    );
  }
  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadQualificationData());
    this.store.dispatch(new ProcessingQualification());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorQualification));
    this.qualificationData$= this.store.pipe(select(getQualification));
    this.isProcessing$=this.store.pipe(select(isProcessingQualification));
  }

  getRowQualificationData$(rowId: number): Observable<IQualifications> {
    console.log('data row', rowId);
    return this.qualificationData$.pipe(
      map(d => d.filter(v => v.qualification_id=== rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowQualificationData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorQualification());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteQualification({recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorQualification());
  }

  onAdd(){
    this.qualification.showEditor();
  }

  onRefreshedButtonClicked(){
    this.qualification.refresh();
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.qualificationGrid) {
      if (filterValue) {
        this.qualificationGrid.clearFilter();
        this.qualificationGrid.filteringLogic = FilteringLogic.Or;
        this.qualificationGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.qualificationGrid.clearFilter();
        this.qualificationGrid.filteringLogic = FilteringLogic.Or;
        this.qualificationGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }

}
