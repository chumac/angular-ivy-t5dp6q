import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ILeaveDays } from '@nutela/models/workforce/leave';
import { Store, select } from '@ngrx/store';
import { IAbsenceState } from '../../../store/root';
import { DialogBoxService, DialogBoxCommandTypes, HrzCommandTypes } from '@nutela/shared/ui';
import { LoadLeaveDaysData, ProcessingLeaveDays, getLeaveDaysData, isProcessingLeaveDays, HideEditorLeaveDays, ShowEditorLeaveDays, showEditorLeaveDays, DeleteLeaveDays } from '../../../store/setups';
import { map, take } from 'rxjs/operators';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { DaysService } from './leave-days.service';
import { LeaveDaysEditorComponent } from './leave-days-editor/leave-days-editor.component';
import { LoadingLeaveDaily, isLoadingLeaveDaily } from '../../../store/leave-daily';
import { ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-workforce-absence-leave-days',
  templateUrl: './leave-days.component.html',
  styleUrls: ['./leave-days.component.scss'],
  providers:[DaysService]
})
export class LeaveDaysComponent implements OnInit {
  @ViewChild('editor') editor: LeaveDaysEditorComponent;
  @ViewChild('DaysGrid') DaysGrid: IgxGridComponent;
  daysData$: Observable<ILeaveDays[]>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  showEditor$: Observable<boolean>;
  dropDownFilterValue:string;

  constructor(private store: Store<IAbsenceState>,
              private dialogBoxService: DialogBoxService,
              public dayService:DaysService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

   storeDispatches() {
    this.store.dispatch(new LoadLeaveDaysData());
    this.store.dispatch(new ProcessingLeaveDays());
    this.store.dispatch(new LoadingLeaveDaily())
   }

 storeSelects() {
   this.isLoading$ = this.store.pipe(select(isLoadingLeaveDaily));
    this.daysData$ = this.store.pipe(select(getLeaveDaysData));
    this.isProcessing$= this.store.pipe(select(isProcessingLeaveDays));
    this.showEditor$= this.store.pipe(select(showEditorLeaveDays));
 }

 onDeleteIconClicked(rowId: number) {
  this.dialogBoxService.show(`Are you sure you want to delete this?`)
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteLeaveDays({recordId: rowId}));
      }
    });
}

onEditIconClicked(rowId:number){
  console.log('onclick event', rowId);
    this.editor.data = null;

    this.getRowDaysData$(rowId).pipe(take(1))
      .subscribe((result) => {
        console.log(result);
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorLeaveDays());
      }
      );
 }

onCancelEditor(){
  this.store.dispatch(new HideEditorLeaveDays());
}

 getRowDaysData$(rowId: number): Observable<ILeaveDays> {
  console.log('data row', rowId);
  return this.daysData$.pipe(
    map(d => d.filter(v => v.grade_id === rowId)),
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
  this.store.dispatch(new ShowEditorLeaveDays());
}

refreshData(){
  this.store.dispatch(new LoadLeaveDaysData());
  this.store.dispatch(new ShowToast({title: null, message: `Leave Days data is being refreshed.`, type: ToastTypes.INFO}));
}


onFilterListSelected(data) {
  this.dropDownFilterValue = data.value;
}

filter(term: string, filterValue: string) {
  if (this.DaysGrid) {
    if (filterValue) {
      this.DaysGrid.clearFilter();
      this.DaysGrid.filteringLogic = FilteringLogic.Or;
      this.DaysGrid.filter(
        filterValue,
        term,
        IgxStringFilteringOperand.instance().condition('contains'),
        false
      );
    } else {
      this.DaysGrid.clearFilter();
      this.DaysGrid.filteringLogic = FilteringLogic.Or;
      this.DaysGrid.filterGlobal(
        term,
        IgxStringFilteringOperand.instance().condition('contains'),
        false
      );
    }
  }
}

}
