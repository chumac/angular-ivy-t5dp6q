import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaveLimitEditorComponent } from './leave-limit-editor/leave-limit-editor.component';
import { ILeaveLimits } from '@nutela/models/workforce/leave';
import { Observable } from 'rxjs/internal/Observable';
import { IAbsenceState } from '../../../store/root';
import { DialogBoxService, DialogBoxCommandTypes, HrzCommandTypes } from '@nutela/shared/ui';
import { Store, select } from '@ngrx/store';
import { LimitService } from './leave-limit.service';
import { LoadLeaveLimitsData, getLeaveLimitsData, HideEditorLeaveLimits, ShowEditorLeaveLimits,
         DeleteLeaveLimits,
         showEditorLeaveLimits,
         LoadingLeaveLimits,
         isLoadingLeaveLimits} from '../../../store/setups';
import { map, take } from 'rxjs/operators';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-workforce-absence-leave-limit',
  templateUrl: './leave-limit.component.html',
  styleUrls: ['./leave-limit.component.scss'],
  providers:[LimitService],
})
export class LeaveLimitComponent implements OnInit {

  @ViewChild('editor') editor: LeaveLimitEditorComponent;
  @ViewChild('LimitGrid') LimitGrid: IgxGridComponent;
  limitsData$: Observable<ILeaveLimits[]>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  showEditor$: Observable<boolean>;
  dropDownFilterValue:string;

  constructor(private store: Store<IAbsenceState>,
              private dialogBoxService: DialogBoxService,
              public limitService:LimitService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

   storeDispatches() {
    this.store.dispatch(new LoadLeaveLimitsData());
    this.store.dispatch(new LoadingLeaveLimits());
   }

 storeSelects() {
    this.limitsData$ = this.store.pipe(select(getLeaveLimitsData));
    this.isLoading$= this.store.pipe(select(isLoadingLeaveLimits));
    this.showEditor$=this.store.pipe(select(showEditorLeaveLimits));
 }

 onEditIconClicked(rowId){
  console.log('onclick event', rowId);
  this.editor.data = null;

  this.getRowLimitData$(rowId).pipe(take(1))
    .subscribe((result) => {
      console.log(result);
      this.editor.data = result;
      this.editor.reset();
      this.store.dispatch(new ShowEditorLeaveLimits());
    }
    );
 }

 onDeleteIconClicked(rowId: number) {
  this.dialogBoxService.show(`Are you sure you want to delete this?`)
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteLeaveLimits({recordId: rowId}));
      }
    });
}



onCancelEditor(){
  this.store.dispatch(new HideEditorLeaveLimits());
}

 getRowLimitData$(rowId: number): Observable<ILeaveLimits> {
  console.log('data row', rowId);
  return this.limitsData$.pipe(
    map(d => d.filter(v => v.limit_id === rowId)),
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
  this.store.dispatch(new ShowEditorLeaveLimits());
}

refreshData(){
  this.store.dispatch(new LoadLeaveLimitsData());
  this.store.dispatch(new ShowToast({title: null, message: `Leave Limit's data is being refreshed.`, type: ToastTypes.INFO}));
}


onFilterListSelected(data) {
  this.dropDownFilterValue = data.value;
}

filter(term: string, filterValue: string) {
  if (this.LimitGrid) {
    if (filterValue) {
      this.LimitGrid.clearFilter();
      this.LimitGrid.filteringLogic = FilteringLogic.Or;
      this.LimitGrid.filter(
        filterValue,
        term,
        IgxStringFilteringOperand.instance().condition('contains'),
        false
      );
    } else {
      this.LimitGrid.clearFilter();
      this.LimitGrid.filteringLogic = FilteringLogic.Or;
      this.LimitGrid.filterGlobal(
        term,
        IgxStringFilteringOperand.instance().condition('contains'),
        false
      );
    }
  }
 }
}
