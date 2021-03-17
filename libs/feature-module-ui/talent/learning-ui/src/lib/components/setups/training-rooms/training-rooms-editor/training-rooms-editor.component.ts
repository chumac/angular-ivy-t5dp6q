import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError, ExternalLookupService } from '@nutela/core-services';
import { TrainingRoomsEditorService } from './training-rooms-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { ITrainingRooms } from '@nutela/models/talent/learning';
import { ILearningState, isProcessingTrainingRooms, ProcessingTrainingRooms, SaveTrainingRooms, AddTrainingRooms, getTrainingRoomsData } from '../../../../../store';
import { getCountries } from '@nutela/store/modules/foundation';
import { IStateSelectOption, ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-talent-training-rooms-editor',
  templateUrl: './training-rooms-editor.component.html',
  styleUrls: ['./training-rooms-editor.component.scss'],
  providers: [TrainingRoomsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class TrainingRoomsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ITrainingRooms;
  @Input() public selectOptionData: ISelectOptionData;
  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  
  trainingroomsList$: Observable<ITrainingRooms[]>;
  countries$: Observable<ISelectOption[]>;
  stateList$: Observable<IStateSelectOption[]>;
  cityList$: Observable<ISelectOption[]>;
  
  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data, this.selectOptionData);
    }
  }

  constructor(public utilService: UtilService, private externalLookupService: ExternalLookupService,
     public fs: TrainingRoomsEditorService, private store: Store<ILearningState>) { 
    super();
  }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingTrainingRooms));
    this.trainingroomsList$ = this.store.pipe(select(getTrainingRoomsData));
    this.countries$ = this.store.pipe(select(getCountries));
  }

  onCountrySelected($event) {
    this.stateList$ = this.externalLookupService.loadStateList($event.value);
    this.fs.state.setValue(null);
    this.fs.city.setValue(null);
  }

  onStateSelected($event) {
    this.cityList$ = this.externalLookupService.loadCityList($event.value);
    this.fs.city.setValue(null);
  }

  setCountryLists(data: ITrainingRooms) {
    let countryId = (data && data.CountryInfo)?data.CountryInfo.nationality_id:null;
    let stateId = (data && data.StateInfo)? data.StateInfo.state_id:null;

    if (countryId) {
      this.stateList$ = this.externalLookupService.loadStateList(countryId);
    }
    if (stateId) {
      this.cityList$ = this.externalLookupService.loadCityList(stateId);
    }
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCancel() {
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  onFileSelected($event){}

  onSubmit(){
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingTrainingRooms());
        this.store.dispatch(new SaveTrainingRooms({data: <ITrainingRooms>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
        this.data = null;
        this.reset();
        this.cancelClick.emit();
      } else {
        this.store.dispatch(new ProcessingTrainingRooms());
        this.store.dispatch(new AddTrainingRooms({data: <ITrainingRooms>this.fs.value }));
        this.data = null;
        this.reset();
        this.cancelClick.emit();
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
    this.fs.init(this.data, this.selectOptionData);
  }

  ngOnDestroy() {
  }

} 
