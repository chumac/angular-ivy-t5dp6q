import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { IPfa } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { PfaEditorService } from './pfa-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../../store/root/root.state';
import { isProcessingPfa, ProcessingPfa, SavePfa, NotProcessingPfa, UpdatePfa, getNationPfa, getStatePfa, getCityPfa, LoadNationPfa, LoadStatePfa, LoadCityPfa } from '../../../../../store/dependencies/pfa';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-payrl-pfa-editor',
  templateUrl: './pfa-editor.component.html',
  styleUrls: ['./pfa-editor.component.scss'],
  providers: [PfaEditorService]
})

export class PfaEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IPfa;

  // @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form = this.fs.buildForm();
    }
  }


  isProcessing$: Observable<boolean>;
  public nationData$: Observable<ISelectOption[]>;
  public stateData$: Observable<ISelectOption[]>;
  public cityData$: Observable<ISelectOption[]>;

  constructor(
    public fs: PfaEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
      super();
    }
    ngOnInit() {
      this.store.dispatch(new LoadNationPfa());
      this.storeSelects();
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingPfa));
      this.nationData$= this.store.pipe(select(getNationPfa));
      this.stateData$= this.store.pipe(select(getStatePfa));
      this.cityData$= this.store.pipe(select(getCityPfa));
    }

    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

    onSubmit() {
      if (this.fs.valid) {
        const recordId = this.data? this.data.pfa_id: 0;
        this.store.dispatch(new ProcessingPfa());
        if(this.inEditMode()){
          this.store.dispatch(new UpdatePfa({data: this.fs.value, recordId: recordId}));
        }
        else {
          this.store.dispatch(new SavePfa({data: this.fs.value}));
        }
      } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
     return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingPfa());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.rebuildForm();
      this.fs.init(this.data);
    }

    onCountrySelected(event){
      this.store.dispatch(new LoadStatePfa({countryId:event.value}));
    }

    onStateSelected(event){
      this.store.dispatch(new LoadCityPfa({stateId:event.value}));
    }

  }
