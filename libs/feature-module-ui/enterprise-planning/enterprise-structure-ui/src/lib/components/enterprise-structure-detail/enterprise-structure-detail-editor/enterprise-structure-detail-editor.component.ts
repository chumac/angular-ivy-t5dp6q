import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ShowToast } from '@nutela/store/shared';

import DataSource from 'devextreme/data/data_source';

import { ISelectOption } from '@nutela/models/core-data';
import { EnterpriseStructureDetailEditorService } from './enterprise-structure-detail-editor.service';
import { IEnterpriseStructureDetail } from '../../../models/interfaces';
import { LoadPositionsData, getPositionsData, ProcessingEnterpriseStructureDetail, SaveEnterpriseStructureDetail, NotProcessingEnterpriseStructureDetail, SaveUpdateEnterpriseStructureDetail, isProcessingEnterpriseStructureDetail } from '../../../store/enterprise-structure-detail';


@Component({
  selector: 'x365-fm-es-enterprise-structure-detail-editor',
  templateUrl: './enterprise-structure-detail-editor.component.html',
  styleUrls: ['./enterprise-structure-detail-editor.component.scss'],
  providers: [EnterpriseStructureDetailEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnterpriseStructureDetailEditorComponent  extends BaseFormComponent
  implements OnInit, OnDestroy {

    activePersonnelDataSource: any = null;

    isProcessing$: Observable<boolean>;
    positionsList$: Observable<ISelectOption[]>;
    showInput: boolean;

    @Input() public show: boolean;
    @Input() public width: number;
    @Input() public data: IEnterpriseStructureDetail;
    @Input() public activePersonnel: ISelectOption[];
    @Input() public linkedStructureDetail: ISelectOption[];
    @Input() public analysisDetails: ISelectOption[];

    @Output() cancelClick = new EventEmitter<any>();
    @Output() showForm: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('num') nameInputRef: ElementRef;



    ngOnChanges(changes: SimpleChanges): void {
      if(changes['data']) {
        this.fs.init(this.data);
      }
      if(changes['activePersonnel']) {
        this.activePersonnelDataSource = new DataSource({
          paginate: true,
          pageSize: 50,
          store: this.activePersonnel
        });
      }
      if(this.show == false) {
        this.reset();
        this.fs.form = this.fs.buildForm()
      }
    }

    constructor(
      public fs: EnterpriseStructureDetailEditorService,
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
      this.isProcessing$ = this.store.pipe(select(isProcessingEnterpriseStructureDetail))
      this.positionsList$ = this.store.pipe(select(getPositionsData));
    }

    storeDispatch() {
      this.store.dispatch(new LoadPositionsData());
    }

    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

    onSubmit() {
      if(this.fs.valid) {
        this.fs.f.removeControl('ent_struc')
        if(this.inEditMode()) {
          const recordId = this.data? this.data.analysis_det_id: 0;
          this.store.dispatch(new ProcessingEnterpriseStructureDetail());
          this.store.dispatch(new SaveUpdateEnterpriseStructureDetail({data: <IEnterpriseStructureDetail>this.fs.value, recordId: recordId, editMode: this.inEditMode()}));
        } else {
        this.store.dispatch(new ProcessingEnterpriseStructureDetail());
        this.store.dispatch(new SaveEnterpriseStructureDetail({data: <IEnterpriseStructureDetail>this.fs.value}));
        }

      }  else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }


    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingEnterpriseStructureDetail());
      this.fs.form = this.fs.buildForm();
      this.cancelClick.emit();
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
