import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef, ViewChild} from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsError, UtilService } from '@nutela/core-services';
import { IEmployeesProfileState } from '../../../../../store';
import { ICustomUserGroup, ICustomUserGroupSetup } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';
import { CustomUserGroupsEditorService } from './custom-user-groups-editor.service';
import { AddCustomUserGroup, isProcessingCustomUserGroup, ProcessingCustomUserGroup, SaveCustomUserGroup, LoadValuesCustomUserGroup, getValuesCustomUserGroup } from '../../../../../store/hr-transactions/custom-user-group';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { from } from 'rxjs/internal/observable/from';


@Component({
  selector: 'x365-fm-workforce-custom-user-groups-editor',
  templateUrl: './custom-user-groups-editor.component.html',
  styleUrls: ['./custom-user-groups-editor.component.scss'],
  providers: [CustomUserGroupsEditorService],
})
export class CustomUserGroupsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean = true;
  @Input() public width: number;
  @Input() public data: ICustomUserGroup;
  @Input() public activePersonnel: Observable<ISelectOption[]>;
  @Input() public customGroups: ICustomUserGroupSetup[];
  @Input() public values: ISelectOption[];
  @ViewChild('customGroupsLookup') customGroupsLookup: DxLookupComponent;
  @Output() cancelClick = new EventEmitter<any>();

  values$: Observable<ISelectOption[]>;
  isProcessing$: Observable<boolean>;
  hasValue$: Observable<boolean>;
  isRestricted$: Observable<boolean>;


  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public fs: CustomUserGroupsEditorService, public utilService: UtilService, private store: Store<IEmployeesProfileState>) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingCustomUserGroup));
    this.values$ = this.store.pipe(select(getValuesCustomUserGroup));
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

  processGroupDetails() {
    const data: ICustomUserGroupSetup = this.customGroupsLookup.selectedItem;
    if(data){
      this.hasValue$ = from([data.has_values]);
      this.isRestricted$ = from([data.is_restricted]);
      this.store.dispatch(new LoadValuesCustomUserGroup({groupId: data.id}));
    }
  }

  onSubmit(){
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingCustomUserGroup());
        this.store.dispatch(new SaveCustomUserGroup({data: <ICustomUserGroup>this.fs.value, recordId: recordId, editMode: this.inEditMode()}));
        } else {
        this.store.dispatch(new ProcessingCustomUserGroup());
        this.store.dispatch(new AddCustomUserGroup({data: <ICustomUserGroup>this.fs.value}));
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


