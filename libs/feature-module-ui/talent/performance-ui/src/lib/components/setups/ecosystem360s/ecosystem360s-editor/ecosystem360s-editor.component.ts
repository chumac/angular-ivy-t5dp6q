import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Ecosystem360sEditorService } from './ecosystem360s-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IEcosystem360, IPlan } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingEcosystem360, ProcessingEcosystem360, SaveEcosystem360, AddEcosystem360, getEcosystem360EmployeeList, getEcosystem360PlanList, LoadEmployeeListEcosystem360 } from '../../../../store';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatIcon} from '@angular/material/icon';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';

@Component({
  selector: 'x365-fm-talent-ecosystem360s-editor',
  templateUrl: './ecosystem360s-editor.component.html',
  styleUrls: ['./ecosystem360s-editor.component.scss'],
  providers: [Ecosystem360sEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class Ecosystem360sEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IEcosystem360;
  hideElement: boolean = true;
  @ViewChild('employeeLookup') employeeLookup: DxLookupComponent; 


  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  planList$: Observable<IPlan[]>;
  employeeList$: Observable<IPersonal[]>;
  role360Options = constants.role360Options;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedEmployees: {id: number, description}[]=[];


  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: Ecosystem360sEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() { }

  storeSelects() {
    this.planList$ = this.store.pipe(select(getEcosystem360PlanList));
    this.isProcessing$ = this.store.pipe(select(isProcessingEcosystem360));
    this.employeeList$ = this.store.pipe(select(getEcosystem360EmployeeList));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCancel() {
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  onFileSelected($event){}

  onSubmit(){
    let employees = [];
    employees = this.selectedEmployees.map(x => {
      return x.id;
    });
    console.log('Submitted value', employees);
    this.fs.employeeId.setValue(employees);
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingEcosystem360());
        this.store.dispatch(new SaveEcosystem360({data: <IEcosystem360>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingEcosystem360());
        this.store.dispatch(new AddEcosystem360({data: <IEcosystem360>this.fs.value }));
      }

    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.form = this.fs.buildForm();
    this.selectedEmployees = [];
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

  add(event): void {    
    const id = this.employeeLookup.selectedItem?this.employeeLookup.selectedItem.employee_id:null;
    const description = this.employeeLookup.selectedItem?this.employeeLookup.selectedItem.emp_fullname:null;

    if (this.selectedEmployees.filter(e => e.id === id).length > 0) {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'You have already made this selection', options: toastOptionsError()}));
    } else {
      this.selectedEmployees.push({id: id, description: description});
    }

  }

  remove(employee: any): void {
    const index = this.selectedEmployees.indexOf(employee);

    if (index >= 0) {
      this.selectedEmployees.splice(index, 1);
    }
  }

} 
