import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { async } from '@angular/core/testing';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IEventParticiantCriteriaEmployee, IEventParticiantCriteriaKey, IEventParticiantCriteriaKeyItems, IEventParticiantGrade, IEventParticiantSchedule, IEventParticiantSource, IEventParticiantStructureType } from '@nutela/models/talent/learning';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { DialogService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { getEventParticipantGradeData, getEventParticipantStructureTypeData, HideEventParticipantCriteria, ILearningState, LoadEventParticipantCriteriaEmployeeData, LoadEventParticipantCriteriaKeyItemsData, LoadEventParticipantSchedule, LoadEventParticipantSource, LoadEventParticipantStructureTypeData, NotProcessingEventParticipants, ProcessingEventParticipants, SaveEventParticipantData } from 'libs/feature-module-ui/talent/learning-ui/src/store';
import { getEventParticipantCriteriaEmployee, getEventParticipantCriteriaItems, getEventParticipantScheduleData, getEventParticipantSourceData } from 'libs/feature-module-ui/talent/learning-ui/src/store/setups/event-detail-data/participants/participants.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventDetailCriteriaService } from './event-detail-participants-criteria.service';

@Component({
  selector: 'x365-fm-talent-event-detail-participants-criteria',
  templateUrl: './event-detail-participants-criteria.component.html',
  styleUrls: ['./event-detail-participants-criteria.component.scss']
})
export class EventDetailParticipantsCriteriaComponent extends BaseFormComponent implements OnInit {

  @Input() public showCriteria: boolean;
  @Input() public width: number = 40;
  @Input() public data: any;
  @Input() public eventId: number;
  @Input() public eventParticiantCriteriaKey: IEventParticiantCriteriaKey[];
  // @Input() public eventParticipantSource: IEventParticiantSource[];
  // @Input() public eventParticipantSchedule: IEventParticiantSchedule[];

  @Output() cancelClick = new EventEmitter<any>();

  eventParticiantGrade$: Observable<IEventParticiantGrade[]>;
  eventParticiantStructureType$: Observable<IEventParticiantStructureType[]>;
  ParticipantCriteriaEmployee$: Observable<IEventParticiantCriteriaEmployee[]>;
  isProcessing$: Observable<boolean>;
  excludedProfile$: IEventParticiantGrade[] = [];
  eventParticiantCriteriaKeyItems$: Observable<IEventParticiantCriteriaKeyItems[]>;
  eventParticipantSource: Observable<IEventParticiantSource[]>;
  eventParticipantSchedule: Observable<IEventParticiantSchedule[]>;
  // selectedProfile$: ISelectedParticiants[] = [];

  // tempExcludedData: IEventAllParticiants[] = [];
  // tempSelectedData: IEventAllParticiants[] = [];

  selectedItems: IEventParticiantCriteriaKeyItems[] = [];
  employee_ids: any = [];

  selectedKeyWordItems: any = [];
  // keywordDescriptions: any = [];
  keywordDescriptionsArray: any = [];
  // keywordItemIds: any = [];
  keywordItemIdsArray: any = [];
  queryString: string;

  isGrade: boolean;
  isStructureType: boolean;
  isRun: boolean = false;
  isSubmitDisable: boolean = true;
  empData: any;
  selectedKeyword: string;
  selectedKeywordId: number;

  constructor(
    public fs: EventDetailCriteriaService,
    public utilService: UtilService,
    private store: Store<ILearningState>,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatch();
  }

  storeSelects() {
    this.eventParticipantSource = this.store.pipe(select(getEventParticipantSourceData));
    this.eventParticipantSchedule = this.store.pipe(select(getEventParticipantScheduleData));
  }

  storeDispatch() {
    this.store.dispatch(new LoadEventParticipantSource());
    this.store.dispatch(new LoadEventParticipantSchedule(this.eventId));
  }

  inEditMode(): boolean {

    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    if (this.fs.value.is_recommendation == null) {
      this.fs.patch({ is_recommendation: false });
    }
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingEventParticipants());
      this.fs.patch({ event_id: this.eventId });

      this.employee_ids = [];

      this.ParticipantCriteriaEmployee$.pipe().subscribe(item => {
        item.forEach(element => {
          this.employee_ids.push(element.employee_id)
        });
      });

      if (this.employee_ids.length == 0) {
        this.store.dispatch(new ShowToast({ title: 'Employee Ids', message: "This field is required.", type: ToastTypes.ERROR }));
        return false;
      }

      var participantObj = {
        event_id: this.fs.value.event_id,
        employee_ids: this.employee_ids,
        schedule_id: this.fs.value.schedule_id,
        source: this.fs.value.source,
        is_recommendation: this.fs.value.is_recommendation
      }

      this.store.dispatch(new SaveEventParticipantData({ data: participantObj }));
      this.data = null;
      this.ParticipantCriteriaEmployee$ = null;
      this.isRun = false;
      this.isSubmitDisable = true;
      this.reset();
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingEventParticipants());
    this.store.dispatch(new HideEventParticipantCriteria());
    this.data = null;
    this.employee_ids = [];
    this.ParticipantCriteriaEmployee$ = null;
    this.isRun = false;
    this.isSubmitDisable = true;
    // this.excludedProfile$ = [];
    // this.selectedProfile$ = [];
    this.reset();
    // this.cancelClick.emit();
  }

  reset() {
    this.selectedKeyWordItems = [];
    this.keywordDescriptionsArray = [];
    this.keywordItemIdsArray = [];
    this.eventParticiantCriteriaKeyItems$ = null;
    this.fs.form = this.fs.buildForm();
    this.fs.init(this.data);
  }

  onRun() {
    this.queryString = null;
    this.selectedKeyWordItems.forEach(element => {
      this.queryString = this.queryString == null ? element.keyname + ' In (' + element.ItemIds + ')' : this.queryString + ' AND ' + element.keyname + ' In (' + element.ItemIds + ')'
    });

    if (this.queryString != null) {
      if (this.eventId) {
        this.queryString = this.queryString + '/' + this.eventId;
      }
      this.isRun = true;
      this.isSubmitDisable = false;
      this.ParticipantCriteriaEmployee$ = this.store.pipe(select(getEventParticipantCriteriaEmployee));
      this.store.dispatch(new LoadEventParticipantCriteriaEmployeeData(this.queryString));
    }
    else {
      this.store.dispatch(new ShowToast({ title: 'Criteria', message: "Fill the criteria.", type: ToastTypes.ERROR }));
    }

  }

  onKeyWord(keyData, keyId) {
    this.selectedKeyword = keyData;
    this.selectedKeywordId = keyId;
    this.eventParticiantCriteriaKeyItems$ = this.store.pipe(select(getEventParticipantCriteriaItems));
    this.store.dispatch(new LoadEventParticipantCriteriaKeyItemsData(keyData));

    if (this.selectedKeyWordItems != null && this.selectedKeyWordItems != [] && this.selectedKeyWordItems.findIndex(x => x.id === this.selectedKeywordId) >= 0) {

      this.eventParticiantCriteriaKeyItems$.pipe().subscribe(item => {
        item.forEach(element => {
          if (this.selectedKeyWordItems[this.selectedKeyWordItems.findIndex(x => x.id === this.selectedKeywordId)].description.split(',').indexOf(element.description) !== -1)
            element.checked = true;
        });
      });

    }
  }


  getStructureType() {
    this.isGrade = false;
    this.isStructureType = true;
    this.eventParticiantStructureType$ = this.store.pipe(select(getEventParticipantStructureTypeData));
    this.store.dispatch(new LoadEventParticipantStructureTypeData());
  }

  storeSelectedItems(item, event) {
    this.eventParticiantCriteriaKeyItems$.pipe().subscribe(item => {
      item.forEach(element => {
        element.keyword = this.selectedKeyword;
      });
    });

    if (event.checked) {
      this.selectedItems.push(item);
      if (this.selectedKeyWordItems != null && this.selectedKeyWordItems != [] && this.selectedKeyWordItems.findIndex(x => x.id === this.selectedKeywordId) >= 0) {
        this.keywordDescriptionsArray[item.keyword] = this.selectedKeyWordItems[this.selectedKeyWordItems.findIndex(x => x.id === this.selectedKeywordId)].description.split(',');
        this.keywordItemIdsArray[item.keyword] = this.selectedKeyWordItems[this.selectedKeyWordItems.findIndex(x => x.id === this.selectedKeywordId)].ItemIds.split(',');
      }
      if (this.keywordDescriptionsArray[item.keyword]) {
        this.keywordDescriptionsArray[item.keyword].push(item.description);
      } else {
        this.keywordDescriptionsArray[item.keyword] = item.description;
      }
      if (this.keywordItemIdsArray[item.keyword]) {
        this.keywordItemIdsArray[item.keyword].push(item.id);
      } else {
        this.keywordItemIdsArray[item.keyword] = item.id;
      }
    } else {
      this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
      this.keywordDescriptionsArray[item.keyword].splice(this.keywordDescriptionsArray[item.keyword].indexOf(item.description), 1);
      this.keywordItemIdsArray[item.keyword].splice(this.keywordItemIdsArray[item.keyword].indexOf((item.id)), 1);
    }

    var obj = {
      id: this.selectedKeywordId,
      keyname: this.selectedKeyword,
      description: this.keywordDescriptionsArray[item.keyword].toString().replace(/^,|,$/g,''),
      ItemIds: this.keywordItemIdsArray[item.keyword].toString(),
    }

    // obj.description = obj.description.replaceAll(',', ', ');
    // obj.ItemIds = obj.ItemIds.replaceAll(',', ', ');

    if (this.selectedKeyWordItems.findIndex(x => x.id === this.selectedKeywordId) != -1) {
      this.selectedKeyWordItems[this.selectedKeyWordItems.findIndex(x => x.id === this.selectedKeywordId)] = obj;
    } else {
      this.selectedKeyWordItems.push(obj)
    }

  }

  storeActiveProfile(item, event) {
  }

  activedAllProfile() {
  }

  activeSelectedProfile() {
  }

  excludedSelectedProfile() {
  }

  excludedAllProfile() {
    this.eventParticiantGrade$.pipe(
      map(e => {
        console.log(e)
      }))

    // if (eventParticiantGrade$ | async) {
    // for (let profile of this.eventParticiantGrade$.pipe | async) {
    //   this.excludedProfile$.push(profile);
    // }
    // }
    // this.fs.patch({ checked: false })
  }

}
