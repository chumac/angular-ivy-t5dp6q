import { Component, OnInit, ViewChild } from '@angular/core';
import { HolidayManagementEditorComponent } from './holiday-management-editor/holiday-management-editor.component';
import { Observable } from 'rxjs';
import { IPublicHoliday } from '@nutela/models/workforce/leave';
import { Store, select } from '@ngrx/store';
import { IAbsenceState } from '../../../store/root';
import { HolidayService } from './holiday-management.service';
import { DialogBoxService, DialogBoxCommandTypes, HrzCommandTypes } from '@nutela/shared/ui';
import { LoadPublicHolidayData, getPublicHolidayData,HideEditorPublicHoliday, ShowEditorPublicHoliday,
         DeletePublicHoliday, showEditorPublicHoliday, LoadingPublicHoliday, isLoadingPublicHoliday } from '../../../store/setups';
import { map, take } from 'rxjs/operators';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';


@Component({
  selector: 'x365-fm-workforce-absence-holiday-management',
  templateUrl: './holiday-management.component.html',
  styleUrls: ['./holiday-management.component.scss'],
  providers:[HolidayService],
})
export class HolidayManagementComponent implements OnInit {

  @ViewChild('editor') editor: HolidayManagementEditorComponent;
  @ViewChild('holidayGrid') holidayGrid: IgxGridComponent;
  holidayData$: Observable<IPublicHoliday[]>;
  isLoading$: Observable<boolean>;
  showEditor$: Observable<boolean>;

  dropDownFilterValue:string;

  constructor(private store: Store<IAbsenceState>,
              private dialogBoxService: DialogBoxService,
              public holidayService:HolidayService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

   storeDispatches() {
    this.store.dispatch(new LoadPublicHolidayData());
    // this.store.dispatch(new ProcessingPublicHoliday());
    this.store.dispatch(new LoadingPublicHoliday());
   }

 storeSelects() {
    this.holidayData$ = this.store.pipe(select(getPublicHolidayData));
    this.isLoading$= this.store.pipe(select(isLoadingPublicHoliday));
    this.showEditor$= this.store.pipe(select(showEditorPublicHoliday));
 }

 onEditIconClicked(rowId:number){
  console.log('onclick event', rowId);
    this.editor.data = null;

    this.getRowholidayData$(rowId).pipe(take(1))
      .subscribe((result) => {
        console.log(result);
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorPublicHoliday());
      }
      );
 }

 onDeleteIconClicked(rowId: number) {
  this.dialogBoxService.show(`Are you sure you want to delete this?`)
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeletePublicHoliday({recordId: rowId}));
      }
    });
}



onCancelEditor(){
  this.store.dispatch(new HideEditorPublicHoliday());
}

 getRowholidayData$(rowId: number): Observable<IPublicHoliday> {
  console.log('data row', rowId);
  return this.holidayData$.pipe(
    map(d => d.filter(v => v.holiday_id === rowId)),
    map(e => e.shift()))
}


onButtonClicked($event) {
  switch ($event) {
    case HrzCommandTypes.ADD: {
      this.showEditor();
      break;
    }
    case HrzCommandTypes.REFRESH: {
      this.refreshData();
      break;
    }
    default:
      break;
   }
}

showEditor(){
  this.store.dispatch(new ShowEditorPublicHoliday());
}

refreshData(){
  this.store.dispatch(new LoadPublicHolidayData());
  this.store.dispatch(new ShowToast({title: null, message: `Holiday data was refreshed Successfully.`, type: ToastTypes.INFO}));

}


onFilterListSelected(data) {
  this.dropDownFilterValue = data.value;
}

filter(term: string, filterValue: string) {
  if (this.holidayGrid) {
    if (filterValue) {
      this.holidayGrid.clearFilter();
      this.holidayGrid.filteringLogic = FilteringLogic.Or;
      this.holidayGrid.filter(
        filterValue,
        term,
        IgxStringFilteringOperand.instance().condition('contains'),
        false
      );
    } else {
      this.holidayGrid.clearFilter();
      this.holidayGrid.filteringLogic = FilteringLogic.Or;
      this.holidayGrid.filterGlobal(
        term,
        IgxStringFilteringOperand.instance().condition('contains'),
        false
      );
    }
  }
 }
}

