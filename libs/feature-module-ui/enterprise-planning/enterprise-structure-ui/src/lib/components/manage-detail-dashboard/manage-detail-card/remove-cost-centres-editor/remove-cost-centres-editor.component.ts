import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ShowToast } from '@nutela/store/shared';

import { RemoveCostCentresEditorService } from './remove-cost-centres-editor.service';

import { IVirtualLinkTransform, IEnterpriseStructure, ICostCentreTransform } from '../../../../models/interfaces';
import { EnterpriseStructureUtilService } from '../../../../services';
import { DxListComponent, DxDropDownBoxComponent } from 'devextreme-angular';
import { RemoveCostCentres, ProcessingEnterpriseStructureDetail, isProcessingEnterpriseStructureDetail, NotProcessingEnterpriseStructureDetail } from '../../../../store/enterprise-structure-detail';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'x365-fm-es-remove-cost-centres-editor',
  templateUrl: './remove-cost-centres-editor.component.html',
  styleUrls: ['./remove-cost-centres-editor.component.scss'],
  providers: [RemoveCostCentresEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoveCostCentresEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  isProcessing$: Observable<boolean>;
  allCostCentres$: Observable<ICostCentreTransform[]>;
  transformedStructure: ICostCentreTransform[];
  @Input() enterpriseStructures$: Observable<IEnterpriseStructure[]>
  showInput: boolean;
  clickedId: number

  @ViewChild('dropDownBox') dropDownBox: DxDropDownBoxComponent;

  @ViewChild('list') list: DxListComponent;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any;
  @Input() public sturctureId: number;
  @Input() public analysisDetailId: number;
  @Input() public costCentres: ICostCentreTransform[];
  filteredAvailableLinks: IVirtualLinkTransform[];
  costCentreDataSource: any = null;

  @Output() cancelClick = new EventEmitter<any>();
  @Output() showForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }
    if (this.costCentres) {
      this.costCentreDataSource = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.costCentres
      });
    }
    if (this.show === false) {
      this.fs.form = this.fs.buildForm();
    }

  }

  constructor(
    public fs: RemoveCostCentresEditorService,
    public utilService: EnterpriseStructureUtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatch();

  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingEnterpriseStructureDetail));
  }

  storeDispatch() {
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    this.fs.patch({
      cost_centre_id: this.list.selectedItems.map(i => {
        return { cost_centre_id: i.id }
      })
    })
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingEnterpriseStructureDetail());
      this.store.dispatch(new RemoveCostCentres({ data: <ICostCentreTransform[]>this.fs.value.cost_centre_id, recordId: this.analysisDetailId }));
      this.reset()
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingEnterpriseStructureDetail());
    this.fs.form = this.fs.buildForm();
    this.cancelClick.emit();
    this.list.selectedItems = [];
  }
  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  getValue($event) {
    this.showInput = $event.target.checked;
  }

  ngOnDestroy() {
  }
}
