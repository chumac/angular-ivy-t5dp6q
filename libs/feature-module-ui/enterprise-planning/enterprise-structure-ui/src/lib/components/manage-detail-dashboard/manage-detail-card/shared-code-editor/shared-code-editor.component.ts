import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ShowToast } from '@nutela/store/shared';


import { ISelectOption } from '@nutela/models/core-data';

import { SharedCodeEditorService } from './shared-code-editor.service';
import { IgxGridCellComponent } from 'igniteui-angular';
import { IEnterpriseStructureDetail, IAnalysisDetailLinkInfo, IEnterpriseStructure } from '../../../../models/interfaces';
import { ProcessingEnterpriseStructureDetail, NotProcessingEnterpriseStructureDetail, getEnterpriseStructureDetails, ShareCodeEnterpriseStructureDetail } from '../../../../store/enterprise-structure-detail';
import { IAnalysisDetail } from '@nutela/models/workforce/personnel';
import { LoadEnterpriseStructureDetails } from 'libs/feature-module-ui/platform/provisioning-ui/src/lib/store/new-employee';

@Component({
  selector: 'x365-fm-es-shared-code-editor',
  templateUrl: './shared-code-editor.component.html',
  styleUrls: ['./shared-code-editor.component.scss'],
  providers: [SharedCodeEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedCodeEditorComponent  extends BaseFormComponent
  implements OnInit, OnDestroy {

    isProcessing$: Observable<boolean>;
    showInput: boolean;
    selection: boolean = false;
    selectedStructureDetails: IEnterpriseStructureDetail[];
    detId: number;
    strucId: number;
    higherStructuresTransformed: ISelectOption[];
    structureDetailsTransformed: ISelectOption[];

    @Input() public show: boolean;
    @Input() public width: number;
    @Input() public data: IEnterpriseStructureDetail;
    @Input() public activePersonnel: ISelectOption[];
    @Input() public enterpriseStructures: IEnterpriseStructure[];
    @Input() public higherStructures: IAnalysisDetailLinkInfo[];
    @Input() public selectedDetIds: any[];
    @Input() public id: number;

    @Output() cancelClick = new EventEmitter<any>();
    @Output() showForm: EventEmitter<boolean> = new EventEmitter<boolean>();

    structureDetails$: Observable<IAnalysisDetail[]>;

    ngOnChanges(changes: SimpleChanges): void {
      if(changes['data']) {
        this.fs.init(this.data);
      }
      if(this.show) {
        this.fs.oldSharedCode.setValue(this.data.shared_code)
      } else {
        this.reset();
        this.fs.form = this.fs.buildForm();
      }
    }

    constructor(
      public fs: SharedCodeEditorService,
      public utilService: UtilService,
      private store: Store<IAppState>,
      private cd: ChangeDetectorRef
    ) {
      super();
    }

    ngOnInit() {
      this.storeSelects() ;
      this.storeDispatch();
    }

    storeSelects() {
      this.structureDetails$ = this.store.pipe(select(getEnterpriseStructureDetails))
    }

    storeDispatch() {

    }

    onStructureTypeSelected(event) {
      this.store.dispatch(new LoadEnterpriseStructureDetails({recordId: event.value}));
      this.structureDetails$.subscribe(val => {
        this.structureDetailsTransformed = this.utilService.transformToSelectDataList(val, 'analysis_det_id', 'description');
      })
    }

  handleRowSelection(args) {
    const targetCell = args.cell as IgxGridCellComponent;
    this.selectedStructureDetails = targetCell.row.rowData.analysisDetailsInfo;
    this.strucId = targetCell.row.rowData.analysis_id;
    this.selection = true;
  }

  promote(args) {
    const targetCell = args.cell as IgxGridCellComponent;
    this.detId = targetCell.row.rowData.analysis_det_id;
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

    onRowClickChange($event) {

    }

    onSubmit() {
      if(this.fs.valid) {
        this.fs.f.removeControl('old_shared_code');
        this.store.dispatch(new ProcessingEnterpriseStructureDetail());
        this.store.dispatch(new ShareCodeEnterpriseStructureDetail({data: <any[]>this.fs.value, recordId: this.id}));
      }  else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingEnterpriseStructureDetail());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
      this.selection = false;
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
