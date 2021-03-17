import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { HrzCommandTypes, DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import {from} from 'rxjs'; 
import * as XLSX from 'xlsx';
import { IPerformanceState, LoadPlanlistLoadObjectives, getLoadObjectivesPlanList, ObjectiveExists, objectiveExistsLoadObjectives, ShowEditorLoadObjectives, showEditorLoadObjectives, HideEditorLoadObjectives, UploadObjectives, getLoadObjectivesObjectiveData, HideViewerLoadObjectives, showViewerLoadObjectives, ShowViewerLoadObjectives, DeleteObjectiveDataLoadObjectives, isProcessingDataGridLoadObjectives, ProcessingDataGridLoadObjectives, ValidateObjectives, ResetObjectiveDataLoadObjectives, NotProcessingDataGridLoadObjectives, isProcessingLoadObjectives, ProcessingLoadObjectives, ImportLoadObjectives, ResetComponentLoadObjectives, validateBtnLoadObjectives, importBtnLoadObjectives, isValidatingLoadObjectives, ValidatingLoadObjectives, isImportingLoadObjectives, ImportingLoadObjectives, hasIssuesLoadObjectives } from '../../../store';
import { IObjectiveDto, IPlan, ILibraryObjective, IPerspective } from '@nutela/models/talent/performance';
import { ShowToast } from '@nutela/store/shared';
import { UtilService,  toastOptionsError, formatDate } from '@nutela/core-services';
import { map } from 'rxjs/internal/operators/map';
import { MultiEmployeeLoadObjectivesEditorComponent } from '../../common/multi-employee-load-objectives-editor/multi-employee-load-objectives-editor.component';
import { MultiEmployeeLoadObjectivesViewerComponent } from '../../common/multi-employee-load-objectives-viewer/multi-employee-load-objectives-viewer.component';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { IgxGridComponent } from 'igniteui-angular';
import { LoadLibraryPlanlist, getLibraryPlanList, UploadLibraryObjectives, getLibraryObjectiveData, showEditorLibraryLoadObjectives, showViewerLibraryLoadObjectives, ShowEditorLibraryLoadObjectives, HideEditorLibraryLoadObjectives, ShowViewerLibraryLoadObjectives, ProcessingDataGridLibraryLoadObjectives, isProcessingDataGridLibraryLoadObjectives, ResetComponentLibraryLoadObjectives, ResetLibraryLoadObjectives, LibraryObjectiveExists, validateBtnLibraryLoadObjectives, resetBtnLibraryLoadObjectives, selectBtnLibraryLoadObjectives, ValidateLibraryObjectives, ValidatingLibraryLoadObjectives, isValidatingLibraryLoadObjectives, ImportLibraryLoadObjectives, ImportingLibraryLoadObjectives, importBtnLibraryLoadObjectives, isImportingLibraryLoadObjectives, DeleteLibraryLoadObjectives, libraryObjectiveExists, getPerspectListLibraryLoadObjectives, getAnalysisListLibraryLoadObjectives, getAnalysisDetListLibraryLoadObjectives, getPositionListLibraryLoadObjectives, getDesignationListLibraryLoadObjectives, getGradeListLibraryLoadObjectives, getEmployeeListLibraryLoadObjectives, LoadLibraryEmployeeList, LoadLibraryGradeList, LoadLibraryDesignationList, LoadLibraryPositionList, LoadLibraryAnalysisDetList, LoadLibraryAnalysisList, LoadLibraryPerspectiveList, LoadLibraryObjectiveData } from '../../../store/planning';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';


@Component({
  selector: 'x365-fm-talent-library-load-objectives',
  templateUrl: './library-load-objectives.component.html',
  styleUrls: ['./library-load-objectives.component.scss']
})
export class LibraryLoadObjectivesComponent implements OnInit {

  @ViewChild('editor') editor: MultiEmployeeLoadObjectivesEditorComponent;
  @ViewChild('viewer') viewer: MultiEmployeeLoadObjectivesViewerComponent;
  @ViewChild('plansLookup') plansLookup: DxLookupComponent;

  showLibraryEditor$: Observable<boolean>;
  showLibraryViewer$: Observable<boolean>;
  libraryObjectiveExists$: Observable<boolean>;
  enableImportBtn$: Observable<boolean>;
  enableValidationBtn$: Observable<boolean>;
  enableResetBtn$: Observable<boolean>;
  enableSelectBtn$: Observable<boolean>;
  isValidating$: Observable<boolean>;
  isImporting$: Observable<boolean>;
  isProcessingLibraryDataGrid$: Observable<boolean>;
  isProcessingLoadObjectives$: Observable<boolean>;
  public libraryObjectivesDataGrid: IgxGridComponent;
  libraryObjectivesData$: Observable<ILibraryObjective[]>;
  planlist$: Observable<IPlan[]>;

  // perspectiveList$: Observable<IPerspective[]>;
  // analysisList$: Observable<any[]>;
  // analysisDetList$: Observable<any[]>;
  // positionList$: Observable<any[]>;
  // designationList$: Observable<any[]>;
  // gradeList$: Observable<any[]>;
  // employeeList$: Observable<IPersonal[]>;

  constructor(private store: Store<IPerformanceState>, private dialogBoxService: DialogBoxService) { }


  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadLibraryPlanlist());
    this.store.dispatch(new LoadLibraryObjectiveData());

    // this.store.dispatch(new LoadLibraryPerspectiveList());
    // this.store.dispatch(new LoadLibraryAnalysisList());
    // this.store.dispatch(new LoadLibraryAnalysisDetList());
    // this.store.dispatch(new LoadLibraryPositionList());
    // this.store.dispatch(new LoadLibraryDesignationList());
    // this.store.dispatch(new LoadLibraryGradeList());
    // this.store.dispatch(new LoadLibraryEmployeeList());
  }

  storeSelects() {
    this.showLibraryEditor$ = this.store.pipe(select(showEditorLibraryLoadObjectives));
    this.showLibraryViewer$ = this.store.pipe(select(showViewerLibraryLoadObjectives));
    this.libraryObjectivesData$ = this.store.pipe(select(getLibraryObjectiveData));
    this.libraryObjectiveExists$ = this.store.pipe(select(libraryObjectiveExists));
    this.planlist$ = this.store.pipe(select(getLibraryPlanList));
    this.isProcessingLibraryDataGrid$ = this.store.pipe(select(isProcessingDataGridLibraryLoadObjectives));
    this.isValidating$ = this.store.pipe(select(isValidatingLibraryLoadObjectives));
    this.isImporting$ = this.store.pipe(select(isImportingLibraryLoadObjectives));
    this.enableValidationBtn$ = this.store.pipe(select(validateBtnLibraryLoadObjectives));
    this.enableResetBtn$ = this.store.pipe(select(resetBtnLibraryLoadObjectives));
    this.enableSelectBtn$ = this.store.pipe(select(selectBtnLibraryLoadObjectives));
    this.enableImportBtn$ = this.store.pipe(select(importBtnLibraryLoadObjectives));

    // this.perspectiveList$ = this.store.pipe(select(getPerspectListLibraryLoadObjectives));
    // this.analysisList$ = this.store.pipe(select(getAnalysisListLibraryLoadObjectives));
    // this.analysisDetList$ =this.store.pipe(select(getAnalysisDetListLibraryLoadObjectives));
    // this.positionList$ = this.store.pipe(select(getPositionListLibraryLoadObjectives));
    // this.designationList$ = this.store.pipe(select(getDesignationListLibraryLoadObjectives));
    // this.gradeList$ = this.store.pipe(select(getGradeListLibraryLoadObjectives));
    // this.employeeList$ = this.store.pipe(select(getEmployeeListLibraryLoadObjectives));
  }

  onFileChange(evt: any) {
    
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1){
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Cannot use multiple files', options: toastOptionsError()}))
      // throw new Error('Cannot use multiple files');
    } 
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => { 
      const resFilename = target.files[0].name;
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = <ILibraryObjective[]>(XLSX.utils.sheet_to_json(ws));
      // this.objectivesData$ = from([data])
      this.store.dispatch(new ProcessingDataGridLibraryLoadObjectives());
      this.store.dispatch(new UploadLibraryObjectives({objectiveData: data, filename: resFilename}));
    };
    reader.readAsBinaryString(target.files[0]); 
    
    
  }

  getRowData$(rowId: number): Observable<ILibraryObjective> {
    return this.libraryObjectivesData$.pipe(
     map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.store.dispatch(new ShowEditorLibraryLoadObjectives());
  }

  onEditIconClicked(rowId: number){
    this.editor.data = null;

    this.getRowData$(rowId)
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorLibraryLoadObjectives());
        }
      );
  }

  onViewIconClicked(rowId: number){
    this.viewer.data = null;

    this.getRowData$(rowId)
      .subscribe((result) => {
          // this.viewer.data = result;
          this.store.dispatch(new ShowViewerLibraryLoadObjectives());
        }
      );
  }

  onDeleteIconClicked(rowId: number){
    this.dialogBoxService.show(`Are you sure you want to delete your data?`)
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteLibraryLoadObjectives({recordId: rowId, planID: this.plansLookup.value}));
      }
    });
  }

  onPlanSelect(data){
    if(data){ 
      this.store.dispatch(new ProcessingDataGridLibraryLoadObjectives());
      this.store.dispatch(new LibraryObjectiveExists(data.value));
    }
  }

  onValidateButtonClicked(){
    if(this.plansLookup.value){
      this.store.dispatch(new ValidatingLibraryLoadObjectives());
      this.store.dispatch(new ValidateLibraryObjectives({ planId: this.plansLookup.value}));
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
    }
  }

  onImportButtonClicked(){
    if(this.plansLookup.value){
      this.dialogBoxService.show(`Are you sure you want to take this action?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new ImportingLibraryLoadObjectives());
          this.store.dispatch(new ImportLibraryLoadObjectives({planID: this.plansLookup.value}));
        }
      }); 
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
    }
  }

  onResetButtonClicked(){
    if(this.plansLookup.value){
      this.dialogBoxService.show(`Are you sure you want to delete all your data?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new ResetLibraryLoadObjectives({planID: this.plansLookup.value}));
        }
      });
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
    }
  }

  onCancelLibraryEditor(){
    this.store.dispatch(new HideEditorLibraryLoadObjectives());
  }

  onCancelLibraryViewer(){
    this.store.dispatch(new HideViewerLoadObjectives());
  }

  ngOnDestroy() {   
    this.store.dispatch(new ResetComponentLibraryLoadObjectives());
  }


} 
