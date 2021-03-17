import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { HurdlesEditorService } from './hurdles-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IHurdle } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingHurdle, ProcessingHurdle, SaveHurdle, AddHurdle } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-hurdles-editor',
  templateUrl: './hurdles-editor.component.html',
  styleUrls: ['./hurdles-editor.component.scss'],
  providers: [HurdlesEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class HurdlesEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IHurdle;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: HurdlesEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingHurdle));
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
        this.store.dispatch(new ProcessingHurdle());
        this.store.dispatch(new SaveHurdle({data: <IHurdle>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingHurdle());
        this.store.dispatch(new AddHurdle({data: <IHurdle>this.fs.value }));
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
