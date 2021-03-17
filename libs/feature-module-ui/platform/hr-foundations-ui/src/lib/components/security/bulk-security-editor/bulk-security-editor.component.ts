import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { BulkSecurityEditorService } from './bulk-security-editor.service';
import { UtilService } from '@nutela/core-services';
import { IHRFoundationState } from '../../../store/root';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as constants from '@nutela/shared/app-global';
import { isProcessingSecurity, NotProcessingSecurity, ProcessingSecurity, SaveMultipleSecurity, getRoleData, getBulkAction, getSpecificType, getSpecificStructure, getUsers, LoadRole, LoadUsers, LoadSpecificStructure, LoadSpecificType, LoadBulkAction, isLoadingDropdownSecurity, LoadingDropdownSecurity, showTreeViewSecurity, ShowTreeViewSecurity, HideTreeViewSecurity } from '../../../store/security';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IEmployee } from '@nutela/models/compensation/loans';

@Component({
  selector: 'x365-fm-plf-hrf-bulk-security-editor',
  templateUrl: './bulk-security-editor.component.html',
  styleUrls: ['./bulk-security-editor.component.scss'],
  providers:[BulkSecurityEditorService],
})
export class BulkSecurityEditorComponent extends BaseFormComponent implements OnInit, OnChanges {
  @Input() public show: boolean;
  @Input() public width: number;
  @Output() cancelClick = new EventEmitter<any>();

  @ViewChild('displayType') displayType: SelectComponent;
  @ViewChild('structureType') structureType: SelectComponent;
  @ViewChild('structureDetail') structureDetail: SelectComponent;

  comments:string;
  addcom:boolean=false;
  sub=[];
  ana_id:number;

  isProcessing$: Observable<boolean>;
  isLoadingDropdown$: Observable<boolean>;
  bulkActions$: Observable<ISelectOption[]>;
  specificType$: Observable<ISelectOption[]>;
  specificStructure$: Observable<ISelectOption[]>;
  employeesData$: Observable<IEmployee[]>;
  rolesData$: Observable<ISelectOption[]>;
  showTree$: Observable<boolean>;

  selectedEmployees: string[]
  selectedRoles: string[]
  showType: boolean = false;
  showRoles: boolean = false;
  showAction: boolean = false;
  displayList = constants.Display
  selectedStructureId: number;

constructor(
  public fs: BulkSecurityEditorService,
  public utilService: UtilService,
  private store: Store<IHRFoundationState>) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show']) {
      console.log(this.show)
      if (this.show === false) {
        this.reset();
        this.selectedEmployees = [];
        this.selectedRoles = [];
        if (this.displayType && this.displayType.value) {
          this.displayType.value = null;
        }

        if (this.showType && this.showAction) {
          this.structureType.value = null;
          this.structureDetail.value = null;
          this.showType = false;
          this.showAction = false;
        }
      }
    }
  }
  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingSecurity));
    this.isLoadingDropdown$ = this.store.pipe(select(isLoadingDropdownSecurity));
    this.showTree$ = this.store.pipe(select(showTreeViewSecurity));

    this.rolesData$ = this.store.pipe(select(getRoleData));
    this.bulkActions$ = this.store.pipe(select(getBulkAction));
    this.specificType$ = this.store.pipe(select(getSpecificType));
    this.specificStructure$ = this.store.pipe(select(getSpecificStructure));
    this.employeesData$ = this.store.pipe(select(getUsers));
  }

  storeDispatches() {
    this.store.dispatch(new LoadBulkAction());
  }

  onSecurityAction($event) {
    this.showAction = true;
    // this.selectedAction = $event.value;
    if (($event.value === 2) || ($event.value === 3)) {
      this.selectedRoles = []
      this.showRoles = false;
    } else {
      this.showRoles = true;
    }
  }

  onSelect($event) {
    if ($event.value === 0) {
      this.showType = false;
      this.store.dispatch(new LoadUsers());
    }
    else if ($event.value === 1) {
      this.showType = true;
      this.store.dispatch(new LoadSpecificType());
    }
  }

  onSpecificType($event) {
    this.store.dispatch(new LoadSpecificStructure({ Id: $event.value }));
  }

  onSpecificStructure($event) {
    this.selectedStructureId = $event.value;
    this.store.dispatch(new LoadingDropdownSecurity(true));
    this.store.dispatch(new LoadUsers({ analysis_det_id: $event.value }));
  }


  onCancel() {
    this.store.dispatch(new NotProcessingSecurity());
    this.reset();
    if (this.displayType && this.displayType.value) {
      this.displayType.value = null;
    }

    if (this.structureType && this.structureType.value) {
      this.structureType.value = null
    }

    if (this.structureDetail && this.structureDetail.value) {
      this.structureDetail.value = null
    }
    this.showType = false;
    this.showAction = false;
    this.cancelClick.emit();
  }


  onTreeButtonClick() {
    this.store.dispatch(new ShowTreeViewSecurity());
  }

  onStructureSelected(event: any) {
    this.store.dispatch(new LoadSpecificStructure({ Id: event.structureDetail }));
    this.structureType.value = event.structureType;
    this.structureDetail.value = event.costCenter;
  };

  onCancelStructurePicker() {
    this.store.dispatch(new HideTreeViewSecurity());
  }

  onDoneButtonClicked() {
    this.onCancelStructurePicker();
    this.store.dispatch(new LoadingDropdownSecurity(true));
    this.store.dispatch(new LoadUsers({ analysis_det_id: +this.structureDetail.value }));
  }

  reset() {
    this.fs.f.reset();
  }

  onSubmit() {
    if (this.selectedEmployees && this.selectedEmployees.length) {
      let formData = []
      if (this.showAction === false) {
        this.store.dispatch(new ShowToast({ title: null, message: `Please, select security Action to log.`, type: ToastTypes.INFO }));
      }
      else if ((!this.selectedRoles || !this.selectedRoles.length) && this.showRoles) {
        this.store.dispatch(new ShowToast({ title: null, message: `Please, select at least a role.`, type: ToastTypes.INFO }));
      }
      else {
        this.store.dispatch(new ProcessingSecurity());
          for (let i = 0; i < this.selectedEmployees.length; i++) {
            this.fs.patch({
              user_name: this.selectedEmployees[i],
              role_name: this.selectedRoles,
            });
            formData.push(this.fs.value);
        }
        this.store.dispatch(new SaveMultipleSecurity({ data: formData }));
      }
    } else {
      this.store.dispatch(new ShowToast({ title: null, message: `Please, select at lease one user.`, type: ToastTypes.INFO }));
    }

    }
}
