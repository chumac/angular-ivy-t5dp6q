import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { PositionCategoryEditorService } from './position-category-editor.service';
import { IPositionCategorySetup } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../../store/root';
import { isProcessingPositionCategorySetup, ProcessingPositionCategorySetup, AddPositionCategorySetup, SavePositionCategorySetup, NotProcessingPositionCategorySetup } from '../../../../store/setups/position-category';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-workforce-position-category-editor',
  templateUrl: './position-category-editor.component.html',
  styleUrls: ['./position-category-editor.component.scss'],
  providers: [PositionCategoryEditorService]
})
export class PositionCategoryEditorComponent extends BaseFormComponent  implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;


  @Input() public data: IPositionCategorySetup;

  @Output() cancelClick = new EventEmitter<any>();


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
  }

  isProcessing$: Observable<boolean>;


  constructor(
    public fs: PositionCategoryEditorService,
    public utilService: UtilService,
    private store: Store<IEmployeesProfileState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingPositionCategorySetup));

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
        console.log('data',this.fs.value)
        const recordId = this.data? this.data.id: 0;
        this.store.dispatch(new ProcessingPositionCategorySetup());
        if(this.inEditMode()===false){
          this.store.dispatch(new AddPositionCategorySetup({data: this.fs.value}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new SavePositionCategorySetup({data: this.fs.value, recordId: recordId}));
        }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.SUCCESS}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingPositionCategorySetup());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }

}
