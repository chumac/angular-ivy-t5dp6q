import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HrzCommandTypes, DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { Store, select } from '@ngrx/store';
import { showEditorNotification, LoadNotificationData, getNotificationData,
         ShowEditorNotification, HideEditorNotification, DeleteNotificationData,
         LoadPosition, getPositionData, isLoadingNotification,
         LoadingNotification,
         LoadNotificationTo,
         LoadProcess} from '../../store/notification';
import { NotificationEditorComponent } from './notification-editor/notification-editor.component';
import { Observable } from 'rxjs/internal/Observable';
import { INotification } from '@nutela/models/foundation';
import { IHRFoundationState } from '../../store/root';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { ISelectOption } from '@nutela/models/core-data';
import { IgxGridComponent,
         FilteringLogic,
         IgxStringFilteringOperand } from 'igniteui-angular';
import { ToastTypes,STANDARD_ROUTES} from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { Title } from '@angular/platform-browser';
import { UtilService } from '@nutela/core-services';


@Component({
  selector: 'x365-fm-plf-hrf-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @ViewChild('editor') editor: NotificationEditorComponent ;

  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  isLoading$:Observable<boolean>;
  notificationData$: Observable<INotification[]>;
  positionData$: Observable<ISelectOption[]>;

  dropDownFilterValue: string;
  entityId: number;
  entityKey: number;
  entityDescription: number;
 @ViewChild('NotificationGrid') NotificationGrid: IgxGridComponent;


   constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private utilService: UtilService,
    private titleService: Title,
    private route: ActivatedRoute,
    public notify:NotificationService,
    private store: Store<IHRFoundationState>,
    private dialogBoxService: DialogBoxService,
    private location: Location
  ) {
     titleService.setTitle(`${'Notification'}${this.partialDocumentTitle}`)
     this.route.params.subscribe(params => {
       this.entityId = +params.entityId
       this.entityKey = +params.entityKey
       this.entityDescription = params.entityDescription
     })
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

    console.log(this.entityDescription)
  }

   storeDispatches() {
     this.store.dispatch(new LoadingNotification());
    this.store.dispatch(new LoadNotificationData({recordId:this.entityId}));
     this.store.dispatch(new LoadPosition());
     this.store.dispatch(new LoadNotificationTo());
     this.store.dispatch(new LoadProcess());
   }

 storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorNotification));
    this.notificationData$ = this.store.pipe(select(getNotificationData));
    this.positionData$= this.store.pipe(select(getPositionData));
    this.isLoading$= this.store.pipe(select(isLoadingNotification));
 }

  onAdd() {
   this.editor.setDefaultValue({process_id: this.entityKey, sysentity_id: this.entityId})
    this.store.dispatch(new ShowEditorNotification());
 }

  onRefreshedButtonClicked() {
    this.store.dispatch(new LoadNotificationData({recordId: this.entityId}));
    this.store.dispatch(new ShowToast({title: null, message: ` Notifications was Refreshed Successfully.`, type: ToastTypes.INFO}));
  }

  goBack(){
    this.location.back();
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new LoadingNotification());
          this.store.dispatch(new DeleteNotificationData({recordId: rowId, entityId: this.entityId}));
        }
      });
  }

  onCancelEditor(){
    this.store.dispatch(new HideEditorNotification());
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.NotificationGrid) {
      if (filterValue) {
        this.NotificationGrid.clearFilter();
        this.NotificationGrid.filteringLogic = FilteringLogic.Or;
        this.NotificationGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.NotificationGrid.clearFilter();
        this.NotificationGrid.filteringLogic = FilteringLogic.Or;
        this.NotificationGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }

}
