import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { HrzCommandTypes, DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import {from} from 'rxjs'; 
import * as XLSX from 'xlsx';
import { IPerformanceState, LoadPlanlistLoadObjectives, getLoadObjectivesPlanList, ObjectiveExists, objectiveExistsLoadObjectives, ShowEditorLoadObjectives, showEditorLoadObjectives, HideEditorLoadObjectives, UploadObjectives, getLoadObjectivesObjectiveData, HideViewerLoadObjectives, showViewerLoadObjectives, ShowViewerLoadObjectives, DeleteObjectiveDataLoadObjectives, isProcessingDataGridLoadObjectives, ProcessingDataGridLoadObjectives, ValidateObjectives, ResetObjectiveDataLoadObjectives, NotProcessingDataGridLoadObjectives, isProcessingLoadObjectives, ProcessingLoadObjectives, ImportLoadObjectives, ResetComponentLoadObjectives, validateBtnLoadObjectives, importBtnLoadObjectives, isValidatingLoadObjectives, ValidatingLoadObjectives, isImportingLoadObjectives, ImportingLoadObjectives, hasIssuesLoadObjectives, resetBtnLoadObjectives } from '../../../store';
import { IObjectiveDto, IPlan } from '@nutela/models/talent/performance';
import { ShowToast } from '@nutela/store/shared';
import { UtilService,  toastOptionsError, formatDate } from '@nutela/core-services';
import { map } from 'rxjs/internal/operators/map';
import { ObjectiveEditorComponent } from '../../common/objective-editor/objective-editor.component';
import { ObjectiveViewerComponent } from '../../common/objective-viewer/objective-viewer.component';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { IgxGridComponent } from 'igniteui-angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-talent-load-objectives',
  templateUrl: './load-objectives.component.html',
  styleUrls: ['./load-objectives.component.scss']
})
export class LoadObjectivesComponent implements OnInit, OnDestroy {

  @ViewChild('editor') editor: ObjectiveEditorComponent;
  @ViewChild('viewer') viewer: ObjectiveViewerComponent;
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
  isProcessingLoadObjectives$: Observable<boolean>;
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
    this.store.dispatch(new LoadPlanlistLoadObjectives());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorLoadObjectives));
    this.showViewer$ = this.store.pipe(select(showViewerLoadObjectives));
    this.isProcessingDataGrid$ = this.store.pipe(select(isProcessingDataGridLoadObjectives));
    this.isProcessingLoadObjectives$ = this.store.pipe(select(isProcessingLoadObjectives));
    this.isValidating$ = this.store.pipe(select(isValidatingLoadObjectives));
    this.isImporting$ = this.store.pipe(select(isImportingLoadObjectives));
    this.objectivesData$ = this.store.pipe(select(getLoadObjectivesObjectiveData));
    this.planlist$ = this.store.pipe(select(getLoadObjectivesPlanList));
    this.objectiveExists$ = this.store.pipe(select(objectiveExistsLoadObjectives));
    this.enableValidationBtn$ = this.store.pipe(select(validateBtnLoadObjectives));
    this.enableImportBtn$ = this.store.pipe(select(importBtnLoadObjectives));
    this.enableResetBtn$ = this.store.pipe(select(resetBtnLoadObjectives));
    this.hasIssues$ = this.store.pipe(select(hasIssuesLoadObjectives));
  }

  onValidateButtonClicked(){
    if(this.plansLookup.value){ 
      this.store.dispatch(new ValidatingLoadObjectives());
      this.store.dispatch(new ValidateObjectives({ planId: this.plansLookup.value}));
    }
  }

  onImportButtonClicked(){
    this.dialogBoxService.show(`Are you sure you want to take this action?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new ImportingLoadObjectives());
        this.store.dispatch(new ImportLoadObjectives({planID: this.plansLookup.value}));
      }
    });  
  }

  onResetButtonClicked(){
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new ResetObjectiveDataLoadObjectives({planID: this.plansLookup.value}));
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
        this.store.dispatch(new ProcessingLoadObjectives());
        this.store.dispatch(new UploadObjectives({objectiveData: data, planID: this.plansLookup.value, filename: resFilename}));
      };
      reader.readAsBinaryString(target.files[0]);

    } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'File Format not supported', options: toastOptionsError()}))
    }
    
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorLoadObjectives());
  }

  onCancelViewer(){
    this.store.dispatch(new HideViewerLoadObjectives());
  }



  onEditIconClicked(rowId: number){
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorLoadObjectives());
        }
      );
  }

  onViewIconClicked(rowId: number){
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerLoadObjectives());
        }
      );
  }

  onDeleteIconClicked(rowId: number){
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteObjectiveDataLoadObjectives({recordId: rowId, planID: this.plansLookup.value}));
      }
    });
  }

  onPlanSelect(data){
    if(data){
      this.store.dispatch(new ProcessingDataGridLoadObjectives());
      this.store.dispatch(new ObjectiveExists(data.value));
    }
    
  }

  getRowData$(rowId: number): Observable<IObjectiveDto> {
    return this.objectivesData$.pipe(
     map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  ngOnDestroy() {   
    this.store.dispatch(new ResetComponentLoadObjectives());
  }

}

