import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ShowToast } from '@nutela/store/shared';


import { ISelectOption } from '@nutela/models/core-data';

import { ConnectChildrenEditorService } from './connect-children-editor.service';
import { IgxGridComponent } from 'igniteui-angular';
import { IAnalysisDetailLinkInfo } from '../../../../models/interfaces';
import { ProcessingEnterpriseStructureDetail, NotProcessingEnterpriseStructureDetail, getEnterpriseStructureDetails, SaveEnterpriseStructureDetailReconnect, isProcessingEnterpriseStructureDetail, LoadEnterpriseStructureDetails, SaveEnterpriseStructureDetailReconnectChildren } from '../../../../store/enterprise-structure-detail';
import { IAnalysisDetail } from '@nutela/models/workforce/personnel';

@Component({
  selector: 'x365-fm-es-connect-children-editor',
  templateUrl: './connect-children-editor.component.html',
  styleUrls: ['./connect-children-editor.component.scss'],
  providers: [ConnectChildrenEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectChildrenEditorComponent  extends BaseFormComponent
  implements OnInit, OnDestroy {

    isProcessing$: Observable<boolean>;
    destinationId: number;
    higherStructuresTransformed: ISelectOption[];
    structureDetailsTransformed: ISelectOption[];

    @Input() public show: boolean;
    @Input() public width: number;
    @Input() public data: IAnalysisDetail;
    @Input() public higherStructures: IAnalysisDetailLinkInfo[];
    @Input() public analysisDetailId: number;

    @Output() cancelClick = new EventEmitter<any>();
    @Output() showForm: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('num') nameInputRef: ElementRef;
    @ViewChild('structureGrid', { read: IgxGridComponent }) structureGrid: IgxGridComponent;

    structureDetails$: Observable<IAnalysisDetail[]>;

    ngOnChanges(changes: SimpleChanges): void {
      if(changes['data']) {
        this.fs.init(this.data);
      }

      if(this.show) {
        this.higherStructuresTransformed = this.utilService.transformToSelectDataList(this.higherStructures, 'analysis_id', 'description');
      } else {
        this.reset();
        this.fs.form = this.fs.buildForm()
      }

    }

    constructor(
      public fs: ConnectChildrenEditorService,
      public utilService: UtilService,
      private store: Store<IAppState>,
      private cd: ChangeDetectorRef
    ) {
      super();
    }

    ngOnInit() {
      this.storeSelects() ;
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingEnterpriseStructureDetail));
      this.structureDetails$ = this.store.pipe(select(getEnterpriseStructureDetails))
    }

    onStructureTypeSelected(event) {
      this.store.dispatch(new LoadEnterpriseStructureDetails({recordId: event.value}))
      this.structureDetails$.subscribe(val => {
        this.structureDetailsTransformed = this.utilService.transformToSelectDataList(val, 'analysis_det_id', 'description');
      })
    }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    this.destinationId = this.fs.value.analysis_det_id;
    if(this.fs.valid) {
      this.store.dispatch(new ProcessingEnterpriseStructureDetail());
      this.store.dispatch(new SaveEnterpriseStructureDetailReconnectChildren({ data: null, analysisDetailId: this.analysisDetailId, destinationId: this.destinationId}));
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
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }

    ngOnDestroy() {
    }
}
