import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { PerspectivesEditorService } from './perspectives-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IPerspective } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingPerspective, ProcessingPerspective, SavePerspective, AddPerspective } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-perspectives-editor',
  templateUrl: './perspectives-editor.component.html',
  styleUrls: ['./perspectives-editor.component.scss'],
  providers: [PerspectivesEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerspectivesEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IPerspective;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  typeOptions = constants.typeOptions;
  PERSPECTIVE_TYPE_CONSTANTS = constants.PERSPECTIVE_TYPE_CONSTANTS;
  typeValue: any;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: PerspectivesEditorService, private store: Store<IPerformanceState>) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingPerspective));
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

  onTypeSelected(data){
    this.typeValue = data.value;
  }

  onSubmit(){
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingPerspective());
        this.store.dispatch(new SavePerspective({data: <IPerspective>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        console.log(<IPerspective>this.fs.value);
        this.store.dispatch(new ProcessingPerspective());
        this.store.dispatch(new AddPerspective({data: <IPerspective>this.fs.value }));
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
