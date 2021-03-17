import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ITransferTransaction, ICurrentJob, ICurrentLocation } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs';
import { TransferEditorService } from './transfer-editor.service';
import { UtilService, formatDate } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../../../store/root';
import { isProcessingTransfer, isLoadingTransfer, ProcessingTransfer, SaveDirectTransfer,
         NotProcessingTransfer, getPositionTransfer, getDesignationTransfer, getLocationTransfer,
         LoadLocationTransfer, getSpecificTypeTransfer, getSpecificStructureTransfer, getCostCenterTransfer,
         LoadSpecificStructureTransfer, LoadCostCenterTransfer, getCurrentJobTransfer, LoadCurrentJobTransfer,
         UpdateDirectTransfer, LoadingTransfer, LoadDesignationTransfer, getStructureTransfer,
         LoadGetStructureTransfer,
         getPicked,} from '../../../../../store/hr-transactions/transfer';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import { getActivePersonnelHR } from '@nutela/store/modules/foundation';
import { DxLookupComponent } from 'devextreme-angular';

@Component({
  selector: 'x365-fm-workforce-transfer-editor',
  templateUrl: './transfer-editor.component.html',
  styleUrls: ['./transfer-editor.component.scss'],
  providers: [TransferEditorService]
})
export class TransferEditorComponent extends BaseFormComponent  implements OnInit{
  @Input() public show: boolean;
  @Input() public width: number;


@ViewChild('temp') temp: ElementRef;
  @ViewChild('tree') tree: ElementRef;
  @ViewChild('employeeValue') employeeValue: DxLookupComponent;

  @Input() public data: ITransferTransaction;
  @Input() public selectedEmployee: number;

  @Output() cancelClick = new EventEmitter<any>();
  @Output() employeeChanged = new EventEmitter<any>();


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
      this.fs.dat=null;
    }

    if (this.show === true) {
      this.fs.patch({
        employee_id: this.selectedEmployee
      })
    }
    if(this.inEditMode() && this.data.newLocationStructure){
      console.log('its ran');
      this.onStructureTypeChanged(this.data.newLocationStructure.analysis_id)
      }
  }

  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  employeeList$: Observable<ISelectOption[]>;
  position$: Observable<ISelectOption[]>;
  designation$: Observable<ISelectOption[]>;
  location$: Observable<ICurrentLocation>;
  structureType$: Observable<ISelectOption[]>;
  structureTypeDetails$: Observable<ISelectOption[]>;
  costCenter$: Observable<ISelectOption[]>;
  currentJob$:Observable<ICurrentJob>;
  getDetails$:Observable<any>;
  Picked$: Observable<any>;

  enableEmployeeSelect = false;

  constructor(
    public fs: TransferEditorService,
    public utilService: UtilService,
    private store: Store<IEmployeesProfileState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
       this.isProcessing$=this.store.pipe(select(isProcessingTransfer));
       this.isLoading$=this.store.pipe(select(isLoadingTransfer));
       this.employeeList$=this.store.pipe(select(getActivePersonnelHR));
       this.position$=this.store.pipe(select(getPositionTransfer));
       this.designation$=this.store.pipe(select(getDesignationTransfer));
       this.location$=this.store.pipe(select(getLocationTransfer));
       this.structureType$=this.store.pipe(select(getSpecificTypeTransfer));
       this.structureTypeDetails$=this.store.pipe(select(getSpecificStructureTransfer));
       this.costCenter$=this.store.pipe(select(getCostCenterTransfer));
       this.currentJob$=this.store.pipe(select(getCurrentJobTransfer));
       this.getDetails$=this.store.pipe(select(getStructureTransfer));
       this.Picked$=this.store.pipe(select(getPicked));

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
        this.fs.f.removeControl('new_location_id');
        this.fs.effectiveDate.setValue(formatDate(this.fs.effectiveDate.value));
        if(this.fs.endDate.value !== null){
          this.fs.endDate.setValue(formatDate(this.fs.endDate.value));
        }
        const recordId = this.data? this.data.id: 0;
        this.store.dispatch(new ProcessingTransfer());
        if(this.inEditMode()===false){
          this.fs.patch({
          current_location_structure:this.fs.loc.currentLocationID?this.fs.loc.currentLocationID.current_location_structure_id:null,
          current_location_details:this.fs.loc.currentLocationID?this.fs.loc.currentLocationID.current_location_details_id:null,
          current_position:this.fs.dat.position_id,
          current_designation_id:this.fs.dat.designation_id,
        });
          this.store.dispatch(new SaveDirectTransfer({data: this.fs.value}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateDirectTransfer({data: this.fs.value, recordId: recordId}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(),  type: ToastTypes.ERROR}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingTransfer());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }

    onTemporary():boolean{
    let show:boolean=false;
    if(this.temp.nativeElement.checked===true){
      show=true;
    }
    else if(this.temp.nativeElement.checked===false){
      show=false;
    }
    return show;
    }

    onTreeSelection():boolean{
      let show:boolean=false;
      if(this.tree.nativeElement.checked===true){
        show=true;
      }
      else if(this.temp.nativeElement.checked===false){
        show=false;
      }
      return show;
      }

  onChangeEmployee() {
    this.enableEmployeeSelect = true;
  }

    onEmployeeSelect($event){
      console.log($event.value);
      if ($event.value) {
        this.employeeChanged.emit($event.value);
        this.enableEmployeeSelect = false;
        this.store.dispatch(new LoadingTransfer());
        this.store.dispatch(new LoadLocationTransfer({employeeId:$event.value}));
        this.store.dispatch(new LoadCurrentJobTransfer({employeeId:$event.value}));
        this.currentJob$.subscribe(res=>{
          this.fs.dat=res;
          console.log('res job', this.fs.dat);
        })
        this.location$.subscribe(res=>{
          this.fs.loc=res;
          console.log('loc', res);
        })
      }

    }

    onNewPositionSelected($event){
      console.log($event.value);
      this.store.dispatch(new LoadingTransfer());
      this.store.dispatch(new LoadDesignationTransfer({positionId:$event.value}));
    }

    onStructureTypeChanged(val){
      console.log('id',val);
     this.loadStructureDetails(val);
       }

    loadStructureDetails(id:number){
      if(id){
        this.store.dispatch(new LoadingTransfer());
        this.store.dispatch(new LoadSpecificStructureTransfer({Id:id}));
        this.fs.newStructureDetails.setValue(0);
        this.fs.newCostCenter.setValue(0);
        if(this.data.newLocationDetails){
          this.store.dispatch(new LoadGetStructureTransfer({Id:this.data.newLocationDetails.analysis_det_id}));
        }
    }
    this.getDetails$.subscribe(res=>{
      if(res){
       this.fs.patch({
         new_location_id: +res
        })
      }
    this.loadCostCenter(+res);
    })
  }

    loadCostCenter(id:number){
    this.store.dispatch(new LoadCostCenterTransfer({analysis_det_id:id}));
    this.fs.newCostCenter.setValue(0);
    if(this.data.newLocationDetails){
    this.fs.patch({
      new_location_details :this.data.newLocationDetails?this.data.newLocationDetails.analysis_det_id:null,
     })
    }
  }

    onStructureType($event){
      this.store.dispatch(new LoadingTransfer());
      this.store.dispatch(new LoadSpecificStructureTransfer({Id:$event.value}));
    }

    onStructureDetail($event){
      console.log($event.value);
      this.store.dispatch(new LoadingTransfer());
      this.store.dispatch(new LoadCostCenterTransfer({analysis_det_id:$event.value}));
    }

    onTreeClicked(){
      this.fs.show = true;
    }

    onCancelTree(){
      this.fs.show = false;
      this.Picked$.subscribe(res=>{
        if(res){
        this.fs.patch({
         new_location_structure:res.locationId,
         new_location_id:res.locationDetailsId,
         new_location_details:res.locationDetailsId,
         });
        }
      });

      console.log(this.fs.value);
    }
}
