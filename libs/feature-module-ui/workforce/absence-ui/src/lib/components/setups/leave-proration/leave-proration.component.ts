import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaveProrationEditorComponent } from './leave-proration-editor/leave-proration-editor.component';
import { Observable } from 'rxjs';
import { ILeaveProrate } from '@nutela/models/workforce/leave';
import { Store, select } from '@ngrx/store';
import { IAbsenceState } from '../../../store/root';
import { DialogBoxService, DialogBoxCommandTypes} from '@nutela/shared/ui';
import { ProrationService } from './leave-proration.service';
import { LoadLeaveProrateData, getLeaveProrateData, HideEditorLeaveProrate, ShowEditorLeaveProrate, DeleteLeaveProrate, showEditorLeaveProrate, LoadBuild, LoadingLeaveProrate, isLoadingLeaveProrate } from '../../../store/setups';
import { map, take } from 'rxjs/operators';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';

@Component({
  selector: 'x365-fm-workforce-absence-leave-proration',
  templateUrl: './leave-proration.component.html',
  styleUrls: ['./leave-proration.component.scss'],
  providers: [ProrationService]
})
export class LeaveProrationComponent implements OnInit {

  @ViewChild('editor') editor: LeaveProrationEditorComponent;
  @ViewChild('prorateGrid') prorateGrid: IgxGridComponent;
  prorateData$: Observable<ILeaveProrate[]>;
  isLoading$: Observable<boolean>;
  showEditor$: Observable<boolean>;
  dropDownFilterValue:string;

  constructor(private store: Store<IAbsenceState>,
              private dialogBoxService: DialogBoxService,
              public prorateService:ProrationService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

   storeDispatches() {
    this.store.dispatch(new LoadLeaveProrateData());
    this.store.dispatch(new LoadingLeaveProrate());
   }

 storeSelects() {
    this.prorateData$ = this.store.pipe(select(getLeaveProrateData));
    this.isLoading$= this.store.pipe(select(isLoadingLeaveProrate));
    this.showEditor$=this.store.pipe(select(showEditorLeaveProrate));
 }

 onEditIconClicked(rowId){
  this.editor.data = null;

  this.getRowProrateData$(rowId).pipe(take(1))
    .subscribe((result) => {
      console.log(result);
      this.editor.data = result;
      this.editor.reset();
      this.store.dispatch(new ShowEditorLeaveProrate());
    }
    );
 }

 onDeleteIconClicked(rowId: number) {
  this.dialogBoxService.show(`Are you sure you want to delete this?`)
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteLeaveProrate({recordId: rowId}));
      }
    });
}

onBuild(){
  this.store.dispatch(new LoadBuild());
  // this.store.dispatch(new LoadLeaveProrateData());
}

onReset(){
  this.store.dispatch(new LoadBuild());
}

onCancelEditor(){
  this.store.dispatch(new HideEditorLeaveProrate());
}

 getRowProrateData$(rowId: number): Observable<ILeaveProrate> {
  console.log('data row', rowId);
  return this.prorateData$.pipe(
    map(d => d.filter(v => v.leaveprorate_id === rowId)),
    map(e => e.shift()))
}


showEditor(){
  this.store.dispatch(new ShowEditorLeaveProrate());
}

onFilterListSelected(data) {
  this.dropDownFilterValue = data.value;
}

filter(term: string, filterValue: string) {
  if (this.prorateGrid) {
    if (filterValue) {
      this.prorateGrid.clearFilter();
      this.prorateGrid.filteringLogic = FilteringLogic.Or;
      this.prorateGrid.filter(
        filterValue,
        term,
        IgxStringFilteringOperand.instance().condition('contains'),
        false
      );
    }
  }
 }
}
