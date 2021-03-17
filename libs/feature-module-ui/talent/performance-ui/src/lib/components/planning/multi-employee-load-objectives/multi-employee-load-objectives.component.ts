import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { HrzCommandTypes, DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import {from} from 'rxjs'; 
import * as XLSX from 'xlsx';
import { IPerformanceState, LoadPlanlistMultiEmployeeLoadObjectives, getMultiEmployeeLoadObjectivesPlanList, MultiEmployeeObjectiveExists, objectiveExistsMultiEmployeeLoadObjectives, ShowEditorMultiEmployeeLoadObjectives, showEditorMultiEmployeeLoadObjectives, HideEditorMultiEmployeeLoadObjectives, UploadMultiEmployeeObjectives, getMultiEmployeeLoadObjectivesObjectiveData, HideViewerMultiEmployeeLoadObjectives, showViewerMultiEmployeeLoadObjectives, ShowViewerMultiEmployeeLoadObjectives, DeleteObjectiveDataMultiEmployeeLoadObjectives, isProcessingDataGridMultiEmployeeLoadObjectives, ProcessingDataGridMultiEmployeeLoadObjectives, ValidateMultiEmployeeObjectives, ResetObjectiveDataMultiEmployeeLoadObjectives, NotProcessingDataGridMultiEmployeeLoadObjectives, isProcessingMultiEmployeeLoadObjectives, ProcessingMultiEmployeeLoadObjectives, ImportMultiEmployeeLoadObjectives, ResetComponentMultiEmployeeLoadObjectives, validateBtnMultiEmployeeLoadObjectives, importBtnMultiEmployeeLoadObjectives, isValidatingMultiEmployeeLoadObjectives, ValidatingMultiEmployeeLoadObjectives, isImportingMultiEmployeeLoadObjectives, ImportingMultiEmployeeLoadObjectives, hasIssuesMultiEmployeeLoadObjectives, resetBtnMultiEmployeeLoadObjectives } from '../../../store';
import { IObjectiveDto, IPlan } from '@nutela/models/talent/performance';
import { ShowToast } from '@nutela/store/shared';
import { UtilService,  toastOptionsError, formatDate } from '@nutela/core-services';
import { map } from 'rxjs/internal/operators/map';
import { MultiEmployeeLoadObjectivesEditorComponent } from '../../common/multi-employee-load-objectives-editor/multi-employee-load-objectives-editor.component';
import { MultiEmployeeLoadObjectivesViewerComponent } from '../../common/multi-employee-load-objectives-viewer/multi-employee-load-objectives-viewer.component';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { IgxGridComponent } from 'igniteui-angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-talent-multi-employee-load-objectives',
  templateUrl: './multi-employee-load-objectives.component.html',
  styleUrls: ['./multi-employee-load-objectives.component.scss']
})
export class MultiEmployeeLoadObjectivesComponent implements OnInit, OnDestroy { 

  @ViewChild('editor') editor: MultiEmployeeLoadObjectivesEditorComponent;
  @ViewChild('viewer') viewer: MultiEmployeeLoadObjectivesViewerComponent;
  @ViewChild('plansLookup') plansLookup: DxLookupComponent;
  // @ViewChild('objectivesDataGrid', { read: IgxGridComponent });
  @ViewChild('file') file: ElementRef;


  public objectivesDataGrid: IgxGridComponent;
  
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  enableValidationBtn$: Observable<boolean>;
  enableImportBtn$: Observable<boolean>;
  enableResetBtn$: Observable<boolean>;
  isValidating$: Observable<boolean>;
  isImporting$: Observable<boolean>;
  isProcessingDataGrid$: Observable<boolean>;
  isProcessingMultiEmployeeLoadObjectives$: Observable<boolean>;
  objectivesData$: Observable<IObjectiveDto[]>;
  planlist$: Observable<IPlan[]>;
  objectiveExists$: Observable<boolean>;
  hasIssues$: Observable<boolean>;

  constructor(private store: Store<IPerformanceState>, private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadPlanlistMultiEmployeeLoadObjectives());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorMultiEmployeeLoadObjectives));
    this.showViewer$ = this.store.pipe(select(showViewerMultiEmployeeLoadObjectives));
    this.isProcessingDataGrid$ = this.store.pipe(select(isProcessingDataGridMultiEmployeeLoadObjectives));
    this.isProcessingMultiEmployeeLoadObjectives$ = this.store.pipe(select(isProcessingMultiEmployeeLoadObjectives));
    this.isValidating$ = this.store.pipe(select(isValidatingMultiEmployeeLoadObjectives));
    this.isImporting$ = this.store.pipe(select(isImportingMultiEmployeeLoadObjectives));
    this.objectivesData$ = this.store.pipe(select(getMultiEmployeeLoadObjectivesObjectiveData));
    this.planlist$ = this.store.pipe(select(getMultiEmployeeLoadObjectivesPlanList));
    this.objectiveExists$ = this.store.pipe(select(objectiveExistsMultiEmployeeLoadObjectives));
    this.enableValidationBtn$ = this.store.pipe(select(validateBtnMultiEmployeeLoadObjectives));
    this.enableImportBtn$ = this.store.pipe(select(importBtnMultiEmployeeLoadObjectives));
    this.enableResetBtn$ = this.store.pipe(select(resetBtnMultiEmployeeLoadObjectives));
    this.hasIssues$ = this.store.pipe(select(hasIssuesMultiEmployeeLoadObjectives));
  }

  onValidateButtonClicked(){
    if(this.plansLookup.value){ 
      this.store.dispatch(new ValidatingMultiEmployeeLoadObjectives());
      this.store.dispatch(new ValidateMultiEmployeeObjectives({ planId: this.plansLookup.value}));
    }
  }

  onImportButtonClicked(){
    this.dialogBoxService.show(`Are you sure you want to take this action?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new ImportingMultiEmployeeLoadObjectives());
        this.store.dispatch(new ImportMultiEmployeeLoadObjectives({planID: this.plansLookup.value}));
      }
    });  
  }

  onResetButtonClicked(){
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new ResetObjectiveDataMultiEmployeeLoadObjectives({planID: this.plansLookup.value}));
      }
    });
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    let ext = (target.files[0].name.match(/\.([^.]*?)(?=\?|#|$)/) || [])[1]; 
    if(ext.trim() === 'xlsx'){

      if (target.files.length !== 1){
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Cannot use multiple files', options: toastOptionsError()}))
      } 
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => { 
        const resFilename = target.files[0].name;
  
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
  
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
        const data = <IObjectiveDto[]>(XLSX.utils.sheet_to_json(ws));
        this.store.dispatch(new ProcessingMultiEmployeeLoadObjectives());
        this.store.dispatch(new UploadMultiEmployeeObjectives({objectiveData: data, planID: this.plansLookup.value, filename: resFilename}));
      };
      reader.readAsBinaryString(target.files[0]);

    } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'File Format not supported', options: toastOptionsError()}))
    }
    
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorMultiEmployeeLoadObjectives());
  }

  onCancelViewer(){
    this.store.dispatch(new HideViewerMultiEmployeeLoadObjectives());
  }



  onEditIconClicked(rowId: number){
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorMultiEmployeeLoadObjectives());
        }
      );
  }

  onViewIconClicked(rowId: number){
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerMultiEmployeeLoadObjectives());
        }
      );
  }

  onDeleteIconClicked(rowId: number){
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteObjectiveDataMultiEmployeeLoadObjectives({recordId: rowId, planID: this.plansLookup.value}));
      }
    });
  }

  onPlanSelect(data){
    if(data){
      this.store.dispatch(new ProcessingDataGridMultiEmployeeLoadObjectives());
      this.store.dispatch(new MultiEmployeeObjectiveExists(data.value));
    }
    
  }

  getRowData$(rowId: number): Observable<IObjectiveDto> {
    return this.objectivesData$.pipe(
     map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  ngOnDestroy() {   
    this.store.dispatch(new ResetComponentMultiEmployeeLoadObjectives());
  }

}

