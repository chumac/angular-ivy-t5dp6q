import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ISystem } from '@nutela/models/foundation';
import { Observable } from 'rxjs/internal/Observable';
import { IHRFoundationState } from '../../../store/root';
import { DialogBoxService } from '@nutela/shared/ui';
import { LoadSystemData, ProcessingSystem } from '../../../store/system/system.actions';
import { getSystemData, isProcessingSystem } from '../../../store/system/system.selectors';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { NotificationComponent } from '../notification.component';
import { NotificationService } from '../notification.service';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { UtilService } from '@nutela/core-services';
import { Title } from '@angular/platform-browser';
import { take } from 'rxjs/operators';



@Component({
  selector: 'x365-fm-plf-hrf-system-process',
  templateUrl: './system-process.component.html',
  styleUrls: ['./system-process.component.scss']
})
export class SystemProcessComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChild('SystemGrid') SystemGrid: IgxGridComponent;
  systemData$: Observable<ISystem[]>;
  isProcessing$: Observable<Boolean>;
  dropDownFilterValue:string;


     constructor(
      @Inject('partialDocumentTitle') private partialDocumentTitle: string,
      private utilService: UtilService,
      private titleService: Title,
      public notify:NotificationService,
      private router: Router,
      private store: Store<IHRFoundationState>,
    ) {
      titleService.setTitle(`${'System Processes'}${this.partialDocumentTitle}`)
    }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

   storeDispatches() {
    this.store.dispatch(new LoadSystemData());
    this.store.dispatch(new ProcessingSystem());
   }

 storeSelects() {
    this.systemData$ = this.store.pipe(select(getSystemData));
    this.isProcessing$= this.store.pipe(select(isProcessingSystem));
 }

 getRowSystemData$(rowId: number): Observable<ISystem> {
  console.log('data row', rowId);
  return this.systemData$.pipe(
    map(d => d.filter(v => v.entity_id === rowId)),
    map(e => e.shift()))
}

 onViewIconClicked(entityId: number){
   console.log('from system', entityId);
  //  const entityKey = null;
   this.getRowSystemData$(entityId).pipe(take(1))
     .subscribe((result) => {
       console.log(result);
         let entityKey = result.entitykey;
         let descripiton = result.entitykey;
       this.router.navigate([`${STANDARD_ROUTES.notification}/${entityId}/${result.entitykey}/${result.entitydescription}`]);
        // this.notify.description=result.entitydescription;
  });
 }

 onButtonClicked() {
  this.storeDispatches();
  this.store.dispatch(new ShowToast({title: null, message: ` data was Refreshed Successfully.`, type: ToastTypes.INFO}));

}


onFilterListSelected(data) {
  this.dropDownFilterValue = data.value;
}

filter(term: string, filterValue: string) {
  if (this.SystemGrid) {
    if (filterValue) {
      this.SystemGrid.clearFilter();
      this.SystemGrid.filteringLogic = FilteringLogic.Or;
      this.SystemGrid.filter(
        filterValue,
        term,
        IgxStringFilteringOperand.instance().condition('contains'),
        false
      );
    } else {
      this.SystemGrid.clearFilter();
      this.SystemGrid.filteringLogic = FilteringLogic.Or;
      this.SystemGrid.filterGlobal(
        term,
        IgxStringFilteringOperand.instance().condition('contains'),
        false
      );
    }
  }
}

}
