import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { HrzCommandTypes, DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import {from} from 'rxjs'; 
import * as XLSX from 'xlsx';
import { IPerformanceState, LoadPlanlistLoadObjectives, getLoadObjectivesPlanList, ObjectiveExists, objectiveExistsLoadObjectives, ShowEditorLoadObjectives, showEditorLoadObjectives, HideEditorLoadObjectives, UploadObjectives, getLoadObjectivesObjectiveData, HideViewerLoadObjectives, showViewerLoadObjectives, ShowViewerLoadObjectives, DeleteObjectiveDataLoadObjectives, isProcessingDataGridLoadObjectives, ProcessingDataGridLoadObjectives, ValidateObjectives, ResetObjectiveDataLoadObjectives, NotProcessingDataGridLoadObjectives, isProcessingLoadObjectives, ProcessingLoadObjectives, ImportLoadObjectives, ResetComponentLoadObjectives, validateBtnLoadObjectives, importBtnLoadObjectives, isValidatingLoadObjectives, ValidatingLoadObjectives, isImportingLoadObjectives, ImportingLoadObjectives, hasIssuesLoadObjectives } from '../../../store';
import { IObjectiveDto, IPlan } from '@nutela/models/talent/performance';
import { ShowToast } from '@nutela/store/shared';
import { UtilService,  toastOptionsError, formatDate } from '@nutela/core-services';
import { map } from 'rxjs/internal/operators/map';
import { SingleEmployeeLoadObjectivesEditorComponent } from '../../common/single-employee-load-objectives-editor/single-employee-load-objectives-editor.component';
import { SingleEmployeeLoadObjectivesViewerComponent } from '../../common/single-employee-load-objectives-viewer/single-employee-load-objectives-viewer.component';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { IgxGridComponent } from 'igniteui-angular';
import { LoadSingleEmployeePlanlist, getSingleEmployeePlanList, UploadSingleEmployeeObjectives, SingleEmployeeObjectiveExists, getSingleEmployeeObjectiveData, showEditorSingleEmployeeLoadObjectives, showViewerSingleEmployeeLoadObjectives, ShowEditorSingleEmployeeLoadObjectives, HideEditorSingleEmployeeLoadObjectives, ShowViewerSingleEmployeeLoadObjectives, ProcessingDataGridSingleEmployeeLoadObjectives, isProcessingDataGridSingleEmployeeLoadObjectives, ResetComponentSingleEmployeeLoadObjectives, ResetSingleEmployeeLoadObjectives, LoadSingleLoadEmployeelist, getSingleLoadEmployeeList, importBtnSingleEmployeeLoadObjectives, selectBtnSingleEmployeeLoadObjectives, validateBtnSingleEmployeeLoadObjectives, isImportingSingleEmployeeLoadObjectives, isValidatingSingleEmployeeLoadObjectives, DeleteSingleEmployeeLoadObjectives, ValidatingSingleEmployeeLoadObjectives, ValidateSingleEmployeeObjectives, ImportSingleEmployeeLoadObjectives, ImportingSingleEmployeeLoadObjectives, resetBtnSingleEmployeeLoadObjectives } from '../../../store/planning';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-talent-single-employee-load-objectives',
  templateUrl: './single-employee-load-objectives.component.html',
  styleUrls: ['./single-employee-load-objectives.component.scss'] 
})
export class SingleEmployeeLoadObjectivesComponent implements OnInit, OnDestroy {

  @ViewChild('editor') editor: SingleEmployeeLoadObjectivesEditorComponent;
  @ViewChild('viewer') viewer: SingleEmployeeLoadObjectivesViewerComponent;
  @ViewChild('plansLookup') plansLookup: DxLookupComponent;
  @ViewChild('employeesLookup') employeesLookup: DxLookupComponent;

  showSingleEmployeeEditor$: Observable<boolean>;
  showSingleEmployeeViewer$: Observable<boolean>;
  enableImportBtn$: Observable<boolean>;
  enableValidationBtn$: Observable<boolean>;
  enableResetBtn$: Observable<boolean>;
  enableSelectBtn$: Observable<boolean>;
  isValidating$: Observable<boolean>;
  isImporting$: Observable<boolean>;
  isProcessingSingleEmployeeDataGrid$: Observable<boolean>;
  isProcessingLoadObjectives$: Observable<boolean>;
  singleEmployeeObjectivesDataGrid: IgxGridComponent;
  singleEmployeeObjectivesData$: Observable<IObjectiveDto[]>;
  planlist$: Observable<IPlan[]>;
  employeelist$: Observable<IPersonal[]>;
  plansLookupDisableStatus: boolean = true;


  constructor(private store: Store<IPerformanceState>, private dialogBoxService: DialogBoxService) { }


  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadSingleEmployeePlanlist());
    this.store.dispatch(new LoadSingleLoadEmployeelist());
  }

  storeSelects() {
    this.showSingleEmployeeEditor$ = this.store.pipe(select(showEditorSingleEmployeeLoadObjectives));
    this.showSingleEmployeeViewer$ = this.store.pipe(select(showViewerSingleEmployeeLoadObjectives));
    this.singleEmployeeObjectivesData$ = this.store.pipe(select(getSingleEmployeeObjectiveData));
    this.planlist$ = this.store.pipe(select(getSingleEmployeePlanList));
    this.employeelist$ = this.store.pipe(select(getSingleLoadEmployeeList));
    this.isProcessingSingleEmployeeDataGrid$ = this.store.pipe(select(isProcessingDataGridSingleEmployeeLoadObjectives));
    this.isValidating$ = this.store.pipe(select(isValidatingSingleEmployeeLoadObjectives));
    this.isImporting$ = this.store.pipe(select(isImportingSingleEmployeeLoadObjectives));
    this.enableValidationBtn$ = this.store.pipe(select(validateBtnSingleEmployeeLoadObjectives));
    this.enableResetBtn$ = this.store.pipe(select(resetBtnSingleEmployeeLoadObjectives));
    this.enableSelectBtn$ = this.store.pipe(select(selectBtnSingleEmployeeLoadObjectives));
    this.enableImportBtn$ = this.store.pipe(select(importBtnSingleEmployeeLoadObjectives));

  }

  onFileChange(evt: any) {
    
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1){
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Cannot use Multiple files', options: toastOptionsError()}))
      // throw new Error('Cannot use Singleple files');
    } 
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => { 
      const resFilename = target.files[0].name;
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = <IObjectiveDto[]>(XLSX.utils.sheet_to_json(ws));
      this.store.dispatch(new ProcessingDataGridSingleEmployeeLoadObjectives());
      this.store.dispatch(new UploadSingleEmployeeObjectives({objectiveData: data, planID: this.plansLookup.value, filename: resFilename, employeeID: this.employeesLookup.value }));
    };
    reader.readAsBinaryString(target.files[0]);
    
    
  }

  getRowData$(rowId: number): Observable<IObjectiveDto> {
    return this.singleEmployeeObjectivesData$.pipe(
     map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onEditIconClicked(rowId: number){
    if(this.employeesLookup.value) {
      this.editor.data = null;

      this.getRowData$(rowId).pipe(take(1))
        .subscribe((result) => {
            this.editor.employeeId = this.employeesLookup.value;
            this.editor.data = result;
            this.editor.reset();
  
            this.store.dispatch(new ShowEditorSingleEmployeeLoadObjectives());
          }
        );
    } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select an employee', options: toastOptionsError()}))
    }
  }

  onViewIconClicked(rowId: number){
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerSingleEmployeeLoadObjectives());
        }
      );
  }

  onDeleteIconClicked(rowId: number){
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteSingleEmployeeLoadObjectives({recordId: rowId, planID: this.plansLookup.value, employeeID: this.employeesLookup.value}));
      }
    });
  }

  onPlanSelect(data){
    if(this.plansLookup.value){
      if(data){ 
        this.store.dispatch(new ProcessingDataGridSingleEmployeeLoadObjectives());
        this.store.dispatch(new SingleEmployeeObjectiveExists({planID: data.value, employeeID: this.employeesLookup.value}));
      }
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
    }
  }

  onEmployeeSelect(data){
    this.plansLookupDisableStatus = false;
  }

  onValidateButtonClicked(){
    if(this.plansLookup.value){
      this.store.dispatch(new ValidatingSingleEmployeeLoadObjectives());
      this.store.dispatch(new ValidateSingleEmployeeObjectives({ planId: this.plansLookup.value, employeeID: this.employeesLookup.value}));
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
    }
  }

  onImportButtonClicked(){
    if(this.plansLookup.value){
      this.dialogBoxService.show(`Are you sure you want to take this action?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new ImportingSingleEmployeeLoadObjectives());
          this.store.dispatch(new ImportSingleEmployeeLoadObjectives({planID: this.plansLookup.value, employeeID: this.employeesLookup.value}));
        }
      }); 
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
    }
  }

  onResetButtonClicked(){
    if(this.plansLookup.value){
      this.dialogBoxService.show(`Are you sure you want to delete all your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new ResetSingleEmployeeLoadObjectives({planID: this.plansLookup.value, employeeID: this.employeesLookup.value }));
        }
      });
    }else{
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Select a plan', options: toastOptionsError()}))
    }
  }

  onCancelSingleEmployeeEditor(){
    this.store.dispatch(new HideEditorSingleEmployeeLoadObjectives());
  }

  onCancelSingleEmployeeViewer(){
    this.store.dispatch(new HideViewerLoadObjectives());
  }

  ngOnDestroy() {   
    this.store.dispatch(new ResetComponentSingleEmployeeLoadObjectives());
  }
  

}
