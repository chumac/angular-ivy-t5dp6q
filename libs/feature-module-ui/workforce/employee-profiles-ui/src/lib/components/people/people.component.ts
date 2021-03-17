import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import {
  toastOptionsError
} from '@nutela/core-services';

import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { PeoplesService } from './people.service';
import {
  IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand
} from 'igniteui-angular';
import {
  LoadDataPeople,
  getPeopleData,
  ProcessingPeople,
  isProcessingPeople,
  LoadingPeople,
  isLoadingPeople,
  NotLoadingPeople,
} from '@nutela/store/modules/workforce/employee-profiles';
import { IPeople } from '@nutela/models/workforce/personnel';
import { GENERAL } from '@nutela/shared/app-global';
import { map, take } from 'rxjs/operators';
import { ShowToast } from '@nutela/store/shared';
import { PeopleViewerComponent } from './people-viewer/people-viewer.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, VERSION } from '@angular/material';
@Component({
  selector: 'x365-fm-plf-docs-peoples',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  providers: [PeoplesService]
})
export class PeoplesComponent implements OnInit {

  version = VERSION;
  @Input() public viewType: string;

  peopleData$: Observable<IPeople[]>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  dropDownFilterValue: string;
  isPaginating: boolean = false;
  pageNo: number = 1;
  pageSize: number = GENERAL.pageSize;
  sampleSpace: number = 10;
  searchID: number = null;
  searchText: string = null;

  @ViewChild('peoplesGrid') peoplesGrid: IgxGridComponent;
  peopleDialogRef: MatDialogRef<PeopleViewerComponent>;

  constructor(
    private router: Router,
    public service: PeoplesService,
    private store: Store<IAppState>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadingPeople());
    this.store.dispatch(new LoadDataPeople({ pageNo: this.pageNo, pageSize: this.pageSize, searchID: this.searchID, searchText: this.searchText }));
  }

  storeSelects() {
    this.peopleData$ = this.store.pipe(select(getPeopleData));
    this.isProcessing$ = this.store.pipe(select(isProcessingPeople));
    this.isLoading$ = this.store.pipe(select(isLoadingPeople));
  }

  filter(term: string, filterValue: string) {
    let termLength = term.length;
    if(term==='' || null){
      this.peoplesGrid.clearFilter();
      this.store.dispatch(new LoadingPeople());
      this.store.dispatch(new LoadDataPeople({ pageNo: this.pageNo, pageSize: this.pageSize, searchID: this.searchID, searchText: this.searchText }));
    } else if (termLength >= 3) {
      if (filterValue) {
        this.peoplesGrid.clearFilter();
        this.peoplesGrid.filteringLogic = FilteringLogic.Or;
        this.peoplesGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.peoplesGrid.clearFilter();
        this.peoplesGrid.filteringLogic = FilteringLogic.Or;
        this.peoplesGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    } else {
      return new ShowToast({
        title: 'Data Could Not Be Loaded',
        message: 'Something went wrong. Data could not be loaded.',
        options: toastOptionsError()
      });
    }
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  getPersonData$(employeeID: number): Observable<IPeople> {
    return this.peopleData$.pipe(
      map(d => d.filter(v => v.employee_id === employeeID)),
      map(e => e.shift()))
  }

  viewDetails(employeeID: number) {
    this.getPersonData$(employeeID).pipe(take(1))
      .subscribe((data) => {
        this.openModal(data);
      });
  }

  openModal(result: IPeople): void {
    this.peopleDialogRef = this.dialog.open(PeopleViewerComponent, {
      width: '365px',
      data: result,
      panelClass: 'custom-dialog-container'
    });
  }

  // onScroll() {
  //   this.store.dispatch(new ProcessingPeople());
  //   this.pageSize += this.sampleSpace;
  //   this.isPaginating = true;
  //   this.store.dispatch(new LoadDataPeople({ pageNo: this.pageNo, pageSize: this.pageSize, searchID: this.searchID, searchText: this.searchText }));
  // }
}
