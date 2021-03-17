import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { getuseRuleData, HideGradeEditorRelief, IReliefState, isProcessingRelief, NotProcessingRelief, ProcessingRelief, SaveGradesData, SaveReliefGlobalData, SaveReliefGradesData } from 'libs/feature-module-ui/compensation/payroll-ui/src/lib/store/setup/regulation/reliefs-and-exemptions';
import { Observable } from 'rxjs';
import { ReliefGradesService } from './add-grades.service';
import { UtilService } from '@nutela/core-services';
import { IReliefGloble, IUseRuleRelief } from '@nutela/models/compensation/payroll';
import { IReliefCurrency } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-currency.interface';
import { ShowToast } from '@nutela/store/shared';
import { IReliefGrade } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-grade.interface';


@Component({
  selector: 'x365-fm-payrl-add-grades-editor',
  templateUrl: './add-grades-editor.component.html',
  styleUrls: ['./add-grades-editor.component.scss']
})
export class AddGradesEditorComponent extends BaseFormComponent implements OnInit {
  isProcessing$: Observable<boolean>;
  
  
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public reliefId: any;
  @Input() public gradeId: any;
  @Input() public reliefdetId: any;
  @Input() public warningMessage: string = null;
  @Input() public data: IReliefGloble;
  @Input() public reliefCurrencyData: IReliefCurrency[];
  @Input() public reliefGradeData: IReliefGrade[];  
  @Input() public useRuleData: IUseRuleRelief[];
  public directValue : boolean = true;
  public grossPercentage : boolean = false;
  title: string;
  
  constructor(public fs: ReliefGradesService, public utilService: UtilService,private store: Store<IReliefState>) { 
    super();
  }

  ngOnInit() {
    this.storeSelects();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }
    if (this.show === false) {
      this.fs.form = this.fs.buildForm();
    }
  }
  onChangeUseRule(value){
    if(value.itemData.id == 0){
      this.directValue = true;
      this.grossPercentage = false;
    }
    if(value.itemData.id == 1){
      this.directValue = false;
      this.grossPercentage = true;
    }
    if(value.itemData.id == 2 || value.itemData.id == 3){
      this.directValue = true;
      this.grossPercentage = true;
    }
  }


  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingRelief));
  }

  onSubmit(){
    if (this.fs.value.direct_value == null) {
      this.fs.patch({ direct_value: 0 });
    }
    if (this.fs.valid) {
      this.fs.patch({relief_id: this.reliefId});
      this.fs.patch({reliefdet_id: this.reliefdetId});
      this.store.dispatch(new ProcessingRelief());

      if(this.fs.value.gross_percentage == null){
        this.fs.patch({gross_percentage: 0});
      }
      const recordId = this.data ? this.data.reliefdet_id : 0;
      if (recordId == 0){
        this.store.dispatch(new SaveGradesData({ data: this.fs.value }));
      }
      else{
        this.fs.patch({grade_id: this.gradeId});
        this.store.dispatch(new SaveReliefGradesData({id : this.reliefdetId, data: this.fs.value }));
      }

      this.data = null;
      this.reset();
      
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }
  onCancel(){
    this.store.dispatch(new NotProcessingRelief());
    this.store.dispatch(new HideGradeEditorRelief());
    this.data = null;
    this.reset();
   // this.setDefaultFields(null);

  }
  inEditMode(){
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }
  
  reset() {
    this.fs.f.reset();
    this.fs.patch({
      use_rule: 0,
      direct_value: null,
      gross_percentage: null,
      relief_currency: null,
    })
  }


  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  setDefaultFields(val: any) {
    if(val.use_rule == 0){
      this.directValue = true;
      this.grossPercentage = false;
    }
    if(val.use_rule == 1){
      this.directValue = false;
      this.grossPercentage = true;
    }
    if(val.use_rule == 2 || val.use_rule == 3){
      this.directValue = true;
      this.grossPercentage = true;
    }
    if(val.direct_value == null && val.gross_percentage  == null){
        this.title = "Add Grade Relief"
    }else{
      this.title = "Edit Grade Global"
    }

    this.fs.init(val);
  }


}
