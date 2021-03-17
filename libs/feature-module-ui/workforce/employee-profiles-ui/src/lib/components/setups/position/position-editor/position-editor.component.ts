import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { PositionEditorService } from './position-editor.service';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { IPositionSetup } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../../store/root';
import { isProcessingPositionSetup, ProcessingPositionSetup, AddPositionSetup, SavePositionSetup, NotProcessingPositionSetup, getSpecificTypePosition, getSpecificStructurePosition, getCostCenterPosition, LoadSpecificStructurePosition, LoadCostCenterPosition, getPositionListPosition, getGradeListPosition, getPositionCategoryPosition, getStructurePosition, LoadingPositionSetup, LoadGetStructurePosition } from '../../../../store/setups/position';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-workforce-position-editor',
  templateUrl: './position-editor.component.html',
  styleUrls: ['./position-editor.component.scss'],
  providers: [PositionEditorService]
})
export class PositionEditorComponent extends BaseFormComponent  implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;


  @ViewChild('temp') temp: ElementRef;
  @Input() public data: IPositionSetup;

  @Output() cancelClick = new EventEmitter<any>();


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
    if(this.inEditMode() && this.data.analysisInfo){
      this.onStructureTypeChanged(this.data.analysisInfo.analysis_id)
      }
  }

  isProcessing$: Observable<boolean>;
  structureType$: Observable<ISelectOption[]>;
  structureTypeDetails$: Observable<ISelectOption[]>;
  costCenter$: Observable<ISelectOption[]>;
  getDetails$: Observable<any>;
  positionList$: Observable<ISelectOption[]>;
  gradeList$: Observable<ISelectOption[]>;
  positionCategory$: Observable<ISelectOption[]>;


  constructor(
    public fs: PositionEditorService,
    public utilService: UtilService,
    private store: Store<IEmployeesProfileState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingPositionSetup));
      this.structureType$=this.store.pipe(select(getSpecificTypePosition));
      this.structureTypeDetails$=this.store.pipe(select(getSpecificStructurePosition));
      this.costCenter$=this.store.pipe(select(getCostCenterPosition));
      this.positionList$=this.store.pipe(select(getPositionListPosition));
      this.gradeList$=this.store.pipe(select(getGradeListPosition));
      this.positionCategory$=this.store.pipe(select(getPositionCategoryPosition));
      this.getDetails$=this.store.pipe(select(getStructurePosition));
    }

    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

    onSubmit() {
     if (this.fs.valid) {
        this.fs.f.removeControl("analysis_details_id");
        const recordId = this.data? this.data.position_id: 0;
        this.store.dispatch(new ProcessingPositionSetup());
        if(this.inEditMode()===false){
          this.store.dispatch(new AddPositionSetup({data: this.fs.value}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new SavePositionSetup({data: this.fs.value, recordId: recordId}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.SUCCESS}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingPositionSetup());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }

    onScope():boolean{
      let show=false;
      if(this.temp.nativeElement.checked===true){
        show=true;
      }
      else if(this.temp.nativeElement.checked===false){
        show=false;
      }
      return show;
    }

    onFromGrade(){
      if(this.fs.fromGrade.touched){
        this.fs.status=true;
      }
      else{
        this.fs.status=false;
      }
    }

    onStructureTypeChanged(val){
      console.log('id',val);
        this.loadStructureDetails(val);
      }

    loadStructureDetails(id:number){
      if(id){
        // this.store.dispatch(new LoadingPositionSetup());
        this.store.dispatch(new LoadSpecificStructurePosition({Id:id}));
        this.fs.structureDetails.setValue(0);
        this.fs.costCenter.setValue(0);
        if(this.data.analysisDetailsInfo){
          this.store.dispatch(new LoadGetStructurePosition({Id:this.data.analysisDetailsInfo.analysis_det_id}));
        }
    }
    this.getDetails$.subscribe(res=>{
      console.log('resul',res);
      if(res){
       this.fs.patch({
         analysis_details_id: +res //convert string to number
        })
      }
  this.loadCostCenter(+res);
    })
  }

    loadCostCenter(id:number){
    this.store.dispatch(new LoadCostCenterPosition({analysis_det_id:id}));
    this.fs.costCenter.setValue(0);
    if(this.data.analysisDetailsInfo){
      this.fs.patch({
        analysis_det_id:this.data.analysisDetailsInfo?this.data.analysisDetailsInfo.analysis_det_id:null,
       })
    }
    }

    onStructureType($event){
      console.log($event.value);
      this.store.dispatch(new LoadSpecificStructurePosition({Id:$event.value}));

    }

    onStructureDetail($event){
      console.log($event.value);
      this.store.dispatch(new LoadCostCenterPosition({analysis_det_id:$event.value}));
    }

    onFileSelected(data: any) {
      if (data) {
        this.fs.patch({
          position_contract: data.content,
          doc_extension: data.extension,
          doc_size: data.size,
          doc_type:data.doc_type,
        });
      } else {
        this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported', type: ToastTypes.ERROR }));
      }
    }
}
