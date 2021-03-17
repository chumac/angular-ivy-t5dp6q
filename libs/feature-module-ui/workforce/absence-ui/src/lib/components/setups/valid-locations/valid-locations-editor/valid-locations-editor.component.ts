import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { ValidLocationsEditorService } from './valid-locations-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import * as constants from '@nutela/shared/app-global';
import { ISelectOption } from '@nutela/models/core-data';
import { isProcessingValidLocation, ProcessingValidLocation, SaveValidLocation, AddValidLocation, NotProcessingValidLocation } from '../../../../store/setups/valid-location';
import { IAppState } from '@nutela/store/app-state';
import { IValidLocation } from '@nutela/models/workforce/leave';


@Component({
  selector: 'x365-fm-workforce-valid-locations-editor',
  templateUrl: './valid-locations-editor.component.html',
  styleUrls: ['./valid-locations-editor.component.scss'],
  providers: [ValidLocationsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ValidLocationsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IValidLocation;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: ValidLocationsEditorService, private store: Store<IAppState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingValidLocation));
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
        this.store.dispatch(new ProcessingValidLocation());
        this.store.dispatch(new SaveValidLocation({data: <IValidLocation>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingValidLocation());
        this.store.dispatch(new AddValidLocation({data: <IValidLocation>this.fs.value }));
      }

    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

} 
