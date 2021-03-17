import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { FormRendererService } from './form-renderer.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IBasicData } from '@nutela/models/core-data';
import { IFormBuilder } from '@nutela/models/workforce/employee-profiles';
// import { widgetType } from '../form-builder/config/constants.constant';
// import { IProcessesState } from '../../store/root/processes.state';

import { widgetType } from 'libs/feature-module-ui/workforce/processes-ui/src/lib/com-parts/form-builder/config/constants.constant';
import { IProcessesState } from 'libs/feature-module-ui/workforce/processes-ui/src/lib/store/root/processes.state';



@Component({
  selector: 'x365-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss'],
  providers: [FormRendererService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormRendererComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public title: string;
  @Input() public subTitle: string;
  @Input() public data: string;
  @Input() public isBusy: boolean;
  @Input() public readonly: boolean;
  @Input() public isAccessible: boolean = true;

  /* TODO field to create other buttons 
  
  @Input() public showPrimaryButton: boolean;
  @Input() public showSecondaryButton: boolean;
  @Input() public showThirdButton: boolean;

  @Input() public primaryBusy: boolean;
  @Input() public secondaryBusy: boolean;
  @Input() public thirdBusy: boolean;

  @Input() public primaryButtonText: string;
  @Input() public secondaryButtonText: string;
  @Input() public thirdButtonText: string;

  @Input() public primaryButtonDisabled: boolean;
  @Input() public secondaryButtonDisabled: boolean;
  @Input() public thirdButtonDisabled: boolean;

  @Output() onPrimaryClick = new EventEmitter<any>();
  @Output() onSecondaryClick = new EventEmitter<any>();
  @Output() onThirdClick = new EventEmitter<any>();

  @Input() public showCancelButton: boolean;
  @Output() onCancelClick = new EventEmitter<any>();

  */

  // I/O for save button
  @Input() public isSecondaryBusy: boolean;
  @Input() public showSave: boolean;
  @Input() public showSubmit: boolean;
  @Input() public submitText: string;
  
  @Output() formSave = new EventEmitter<any>();
  @Output() formSubmit = new EventEmitter<any>();
  @Output() cancelClick = new EventEmitter<any>();

  transformedData: IFormBuilder;
  isProcessing$: Observable<boolean>;
  dataSetTypes$: Observable<IBasicData[]>;
  formWidgetType = widgetType;
  submitted = false;


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['show']) {
      this.initBuilderData(this.data);
      this.submitted = false;
    }
  }

  constructor(public utilService: UtilService, public fs: FormRendererService,  private store: Store<IProcessesState>, private element: ElementRef, private renderer: Renderer2) {
    super();
  }

  ngOnInit() {

  }

  initBuilderData(data: string) {
    if(data){
      try {
        /* Checks if user can view form */
        if(!this.isAccessible) {
          this.showSave = false;
          this.showSubmit = false;
        } else {
          this.transformedData = <IFormBuilder>JSON.parse(data);
          this.fs.init(this.transformedData);
          /* Checks if form is disabled by the host component to make it read only */
          if(this.readonly) {
            this.fs.f.disable();
            this.showSave = false;
            this.showSubmit = false;
          } else {
            this.showSave = true;
            this.showSubmit = true;
          }
        }
      } catch(e) {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Invalid JSON Property', type: ToastTypes.ERROR}));
      }
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
    // this.data = null;
    // this.reset();
    this.cancelClick.emit();
  }


  onFileRemoved(controlName) {
    this.fs.f.get(controlName).setValue(null);
  }


  onFileSelected($event, controlName) {
    if ($event) {
      this.fs.f.get(controlName).setValue($event);
    }
    // this.onFileRemoved(controlName);
  }

  regexEventHandler(event: KeyboardEvent, inputPattern){
    const pattern = new RegExp(inputPattern, "i");
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  regexPasteEventHandler(event){
    event.preventDefault();
  }

  onSubmit(){
    this.submitted = true;
    if (this.fs.f.invalid) {
        return;
    }
    this.formSubmit.emit(this.fs.value);
  }

  onSave(){
    this.submitted = true;
    if (this.fs.f.invalid) {
        return;
    }
    this.formSave.emit(this.fs.value);
  }


  toJson(value): any {
    if(value){
      let result = null;
      try {
        result = JSON.parse(value);
      } catch (e) {
        console.log(e);
      }
      return result;
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.f.reset();
    this.fs.destroy();
  }

  ngOnDestroy() {
  }

}

