import { Component, OnInit, Input, SimpleChanges, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ISelectOption } from '@nutela/models/core-data';
import { IReport } from '@nutela/models/foundation';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IHRFoundationState } from '../../../store/root';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { getRoleReport, LoadRole, isProcessingReport, NotProcessingReport, ProcessingReport, SaveReport, SaveMultipleReport } from '../../../store/report';
import { ReportPermissionEditorService } from './report-permission-editor.service';
import * as constants from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { map } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-plf-hrf-report-permission-editor',
  templateUrl: './report-permission-editor.component.html',
  styleUrls: ['./report-permission-editor.component.scss'],
  providers:[ReportPermissionEditorService]
})

export class ReportPermissionEditorComponent extends BaseFormComponent implements OnInit{

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IReport[];

  @Output() cancelClick = new EventEmitter<any>();
  @Output() workCompleted = new EventEmitter<any>();

  roleData$: Observable<ISelectOption[]>;
  roleData=[];
  report=constants.Report;
  role:boolean=false;
  log:boolean=false;

  ngOnChanges(changes: SimpleChanges): void {
    // if(changes['data']) {
    //   this.fs.init(this.data);
    // }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
      this.role=false;
      this.log=false;
    }
  }

  isProcessing$: Observable<boolean>;
  constructor(
    public fs: ReportPermissionEditorService ,
    public utilService: UtilService,
    private store: Store<IHRFoundationState>,
    private cd: ChangeDetectorRef) {
      super();
    }

    ngOnInit() {
      this.storeSelects();
      this.storeDispatches();
    }

    storeDispatches() {
      this.store.dispatch(new LoadRole());
     }

   storeSelects() {
      this.roleData$=this.store.pipe(select(getRoleReport));
      this.isProcessing$ = this.store.pipe(select(isProcessingReport));
    }

    onSubmit(){
      console.log('editor data', this.data);
      const all=[];
      for (let i = 0; i < this.data.length ; i++) {
      this.fs.patch({
        report_key: this.data[i].report_key,
        });
      all.push(this.fs.value);
      }
      console.log('all',all);

      if (this.fs.valid) {
        this.store.dispatch(new ProcessingReport());
        this.store.dispatch(new SaveMultipleReport({data: all}));
        }
      else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
        }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
     }

    PermissionSelect($event){
      if($event.value ===0){
      this.role=false;
      this.log=false;
      }
      else if($event.value===1){
        this.role=true;
        this.log=false;
      }
      else if($event.value===2){
        this.role=false;
        this.log= true;
      }
    }

    onCancel() {
      this.store.dispatch(new NotProcessingReport());
       this.data = null;
       this.reset();
      this.cancelClick.emit();
      this.role=false;
      this.log=false;
    }

    reset() {
     this.fs.f.reset();
    }
}
