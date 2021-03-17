import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaveDefinitionEditorComponent } from './leave-definition-editor/leave-definition-editor.component';
import { ILeaveDefinition } from '@nutela/models/workforce/leave';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAbsenceState } from '../../../store/root';
import { DialogBoxService, DialogBoxCommandTypes, HrzCommandTypes } from '@nutela/shared/ui';
import { DefinitionService } from './leave-definition.service';
import { LoadLeaveDefinitionData,  getLeaveDefinitionData, DeleteLeaveDefinition, ShowEditorLeaveDefinition, HideEditorLeaveDefinition, showEditorLeaveDefinition, ShowViewerLeaveDefinition, showViewerLeaveDefinition, isLoadingLeaveDefinition, LoadingLeaveDefinition } from '../../../store/setups';
import { map, take } from 'rxjs/operators';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { LeaveDefinitionViewerComponent } from './leave-definition-viewer/leave-definition-viewer.component';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';



@Component({
  selector: 'x365-fm-workforce-absence-leave-definition',
  templateUrl: './leave-definition.component.html',
  styleUrls: ['./leave-definition.component.scss'],
  providers:[DefinitionService]
})
export class LeaveDefinitionComponent implements OnInit {

  @ViewChild('editor') editor: LeaveDefinitionEditorComponent;
  @ViewChild('viewer') viewer: LeaveDefinitionViewerComponent;
  @ViewChild('definitionGrid') definitionGrid: IgxGridComponent;
  definitionData$: Observable<ILeaveDefinition[]>;
  isLoading$: Observable<boolean>;
  showEditor$:Observable<boolean>;
  showViewer$:Observable<boolean>;
  dropDownFilterValue:string;

  constructor(private store: Store<IAbsenceState>,
              private dialogBoxService: DialogBoxService,
              public definitionService:DefinitionService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

   storeDispatches() {
    this.store.dispatch(new LoadLeaveDefinitionData());
    // this.store.dispatch(new ProcessingLeaveDefinition());
    this.store.dispatch(new LoadingLeaveDefinition());
   }

 storeSelects() {
    this.definitionData$ = this.store.pipe(select(getLeaveDefinitionData));
    this.isLoading$= this.store.pipe(select(isLoadingLeaveDefinition));
    this.showEditor$=this.store.pipe(select(showEditorLeaveDefinition));
    this.showViewer$=this.store.pipe(select(showViewerLeaveDefinition));
 }

 onEditIconClicked(rowId:number){
  console.log('onclick event', rowId);
    this.editor.data = null;

    this.getRowDefinitionData$(rowId).pipe(take(1))
      .subscribe((result) => {
        console.log(result);
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorLeaveDefinition());
      }
      );
 }

 onApprovedViewIconClicked(rowId:number){
  this.viewer.data = null;

  this.getRowDefinitionData$(rowId).pipe(take(1))
    .subscribe((result) => {
      this.viewer.data = result;
      this.store.dispatch(new ShowViewerLeaveDefinition());
    }
    );

 }

 onDeleteIconClicked(rowId: number) {
  this.dialogBoxService.show(`Are you sure you want to delete this?`)
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteLeaveDefinition({recordId: rowId}));
      }
    });
}



onCancelEditor(){
  this.store.dispatch(new HideEditorLeaveDefinition());
}

 getRowDefinitionData$(rowId: number): Observable<ILeaveDefinition> {
  console.log('data row', rowId);
  return this.definitionData$.pipe(
    map(d => d.filter(v => v.leave_id === rowId)),
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
  this.store.dispatch(new ShowEditorLeaveDefinition());
}

refreshData(){
  this.store.dispatch(new LoadLeaveDefinitionData());
  this.store.dispatch(new ShowToast({title: null, message: `Leave Definition data is being refreshed.`, type: ToastTypes.INFO}));

}


onFilterListSelected(data) {
  this.dropDownFilterValue = data.value;
}

filter(term: string, filterValue: string) {
  if (this.definitionGrid) {
    if (filterValue) {
      this.definitionGrid.clearFilter();
      this.definitionGrid.filteringLogic = FilteringLogic.Or;
      this.definitionGrid.filter(
        filterValue,
        term,
        IgxStringFilteringOperand.instance().condition('contains'),
        false
      );
    } else {
      this.definitionGrid.clearFilter();
      this.definitionGrid.filteringLogic = FilteringLogic.Or;
      this.definitionGrid.filterGlobal(
        term,
        IgxStringFilteringOperand.instance().condition('contains'),
        false
      );
    }
  }
 }
}
