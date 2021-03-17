import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef} from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsError, UtilService } from '@nutela/core-services';
import { IEmployeesProfileState } from '../../../../../store';
import { ICommendationTransaction } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';
import { CommendationsEditorService } from './commendations-editor.service';
import { AddCommendation, isProcessingCommendation, ProcessingCommendation, SaveCommendation } from '../../../../../store/hr-transactions/commendation';


@Component({
  selector: 'x365-fm-workforce-commendations-editor',
  templateUrl: './commendations-editor.component.html',
  styleUrls: ['./commendations-editor.component.scss'],
  providers: [CommendationsEditorService],
})
export class CommendationsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean = true;
  @Input() public width: number;
  @Input() public data: ICommendationTransaction;
  @Input() public activePersonnel: Observable<ISelectOption[]>;
  @Input() public roleTypes: ISelectOption[]; 
  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;


  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  } 

  constructor(public fs: CommendationsEditorService, public utilService: UtilService, private store: Store<IEmployeesProfileState>) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingCommendation));
  }

  onCancelButtonClicked() {
    // this.dialogRef.close();
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCancel() { 
    this.reset();
    this.cancelClick.emit();
  }

  onSubmit(){
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.commendation_id;
        this.store.dispatch(new ProcessingCommendation());
        this.store.dispatch(new SaveCommendation({data: <ICommendationTransaction>this.fs.value, recordId: recordId, editMode: this.inEditMode()}));
        } else {
        this.store.dispatch(new ProcessingCommendation());
        this.store.dispatch(new AddCommendation({data: <ICommendationTransaction>this.fs.value}));
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
    this.fs.init(this.data);
  }

  ngOnDestroy() {}

}


