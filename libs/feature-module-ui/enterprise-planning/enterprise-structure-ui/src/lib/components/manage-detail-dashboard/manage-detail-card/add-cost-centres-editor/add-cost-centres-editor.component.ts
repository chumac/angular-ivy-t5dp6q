import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ShowToast } from '@nutela/store/shared';

import { AddCostCentresEditorService } from './add-cost-centres-editor.service';

import { ICostCentreTransform } from '../../../../models/interfaces';
import { EnterpriseStructureUtilService } from '../../../../services';
import { DxListComponent } from 'devextreme-angular';
import { AddCostCentres, NotProcessingEnterpriseStructureDetail, ProcessingEnterpriseStructureDetail, isProcessingEnterpriseStructureDetail } from '../../../../store/enterprise-structure-detail';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'x365-fm-es-add-cost-centres-editor',
  templateUrl: './add-cost-centres-editor.component.html',
  styleUrls: ['./add-cost-centres-editor.component.scss'],
  providers: [AddCostCentresEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCostCentresEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  isProcessing$: Observable<boolean>;

  @ViewChild('list') list: DxListComponent;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any;
  @Input() public sturctureId: number;
  @Input() public analysisDetailId: number;
  @Input() public costCentres: ICostCentreTransform[];
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
        key: "description",
        store: this.costCentres
      });
    }

    if (this.show == false) {
      this.list.selectedItems = [];
      this.fs.form = this.fs.buildForm();
    }
  }

  constructor(
    public fs: AddCostCentresEditorService,
    public utilService: EnterpriseStructureUtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingEnterpriseStructureDetail));
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
      this.store.dispatch(new AddCostCentres({ data: <ICostCentreTransform[]>this.fs.value.cost_centre_id, recordId: this.analysisDetailId }));
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

  ngOnDestroy() {
  }
}
