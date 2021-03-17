import { Component, OnInit, OnDestroy, Input, Output, SimpleChanges, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { INotification, IPositionInfo } from '@nutela/models/foundation';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { IHRFoundationState } from '../../../store';
import { isProcessingNotification, NotProcessingNotification, ProcessingNotification,
  SaveNotification, getNotificationTo, getProcess, getRolesNotification, LoadRolesNotification } from '../../../store/notification';
import { NotificationEditorService } from './notification-editor.service';
import * as constants from '@nutela/shared/app-global';
import { ActivatedRoute } from '@angular/router';
import { ISelectOption } from '@nutela/models/core-data';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-plf-hrf-notification-editor',
  templateUrl: './notification-editor.component.html',
  styleUrls: ['./notification-editor.component.scss'],
  providers: [NotificationEditorService],
})
export class NotificationEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: INotification;
  @Input() public describe: string;
  @Input() public position: IPositionInfo[];
  @Input() public selectOptionData: ISelectOptionData;
  @Output() cancelClick = new EventEmitter<any>();
  notificationTo$: Observable<ISelectOption[]>;
  process$: Observable<ISelectOption[]>;
  roleData$: Observable<ISelectOption[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
      this.groupValue=false;
      this.specificPosition=false;
    }
  }

  public groupValue:boolean=false;
  public specificPosition:boolean= false;
  group=constants.Notification;
  process= constants.Notification_process;
  id:number;
  isProcessing$: Observable<boolean>;

  constructor(
    public fs: NotificationEditorService,
    private route: ActivatedRoute,
    public utilService: UtilService,
    private store: Store<IHRFoundationState>,
    private cd: ChangeDetectorRef) {
      super();
      this.route.params.pipe(take(1)).subscribe(params => {
        this.id = params.id;
      })
    }

    ngOnInit() {
      this.storeSelects();
      this.storeDispatches();
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingNotification));
      this.notificationTo$ = this.store.pipe(select(getNotificationTo));
      this.process$ = this.store.pipe(select(getProcess));
      this.roleData$ = this.store.pipe(select(getRolesNotification));
    }

  storeDispatches() {
    this.store.dispatch(new LoadRolesNotification());
    }


    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

  setDefaultValue({ process_id, sysentity_id }) {
    this.fs.patch({
      process_id,
      sysentity_id
    })
  }

    onSubmit() {
      if (this.fs.valid) {
        this.store.dispatch(new ProcessingNotification());
        this.store.dispatch(new SaveNotification({data: this.fs.value}));
      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingNotification());
       this.data = null;
       this.reset();
      this.cancelClick.emit();

    }

    reset() {
     this.fs.f.reset();
     this.fs.init(this.data);
    }
    groupSelect($event){

      if($event.value ===3 || $event.value===7 ){
        this.groupValue=true;
        this.specificPosition=false;
      }
      else if($event.value===4){
        this.specificPosition=true;
        this.groupValue=false;
      }
      else{
        this.groupValue=false;
        this.specificPosition=false;
      }

    }

}
