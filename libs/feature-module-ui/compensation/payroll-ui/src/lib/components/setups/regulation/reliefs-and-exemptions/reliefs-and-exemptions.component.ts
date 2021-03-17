import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IgxGridComponent } from 'igniteui-angular';
import { ReliefService } from './reliefs.service';
import { select, Store } from '@ngrx/store';
import { IRootState } from '../../../../store/root/root.state';
import { IReliefsList } from '@nutela/models/compensation/payroll';
import { getReliefsData, HideEditorRelief, isLoadingRelief, isProcessingRelief, LoadingRelief, LoadReliefData, LoadReliefProfileData,  selectedReliefProfileData, showEditorAddRelief, ShowEditorRelief, showEditorRelief } from '../../../../store/setup/regulation/reliefs-and-exemptions';
import { ReliefEditorComponent } from './relief-editor/relief-editor.component';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { IReliefProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-profile.interface';
import { Router } from '@angular/router';
import { STANDARD_ROUTES } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-payrl-reliefs-and-exemptions',
  templateUrl: './reliefs-and-exemptions.component.html',
  styleUrls: ['./reliefs-and-exemptions.component.scss']
})
export class ReliefsAndExemptionsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  showEditor$: Observable<boolean>;
  showAddEditor$: Observable<boolean>;
  reliefsData$ : Observable<IReliefsList[]>;
  selectedReliefProfileData$ : Observable<IReliefProfile[]>;
  payroll_profile_id$ : number;

  @ViewChild("editor") reliefEditor: ReliefEditorComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild("reliefsDataGrid") reliefsDataGrid: IgxGridComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,private router: Router,
  public service: ReliefService,private store: Store<IRootState>,private titleService: Title,) { 
    titleService.setTitle(
      `${'Relief'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingRelief));
    this.reliefsData$ = this.store.pipe(select(getReliefsData));
    this.showEditor$ = this.store.pipe(select(showEditorRelief));
    this.showAddEditor$ = this.store.pipe(select(showEditorAddRelief));
    this.selectedReliefProfileData$ = this.store.pipe(select(selectedReliefProfileData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingRelief());
    this.store.dispatch(new LoadReliefData());
  }
  getRowData$(rowId: number): Observable<IReliefsList> {
    return this.reliefsData$.pipe(
      map(d => d.filter(v => v.payroll_profile_id === rowId)),
      map(e => e.shift()))
  }

 search() {
  let filterBy: string = '';
  let searchString: string = '';
  if (this.searchInput) {
    searchString = this.searchInput.nativeElement.value;
  }

  if (this.filterBy) {
    filterBy = <string>this.filterBy.value;
  }
  if (this.reliefsDataGrid) {
    this.service.search(
      this.reliefsDataGrid,
      searchString,
      filterBy
    );
  }
}

onLoadViewClicked(val){
  this.payroll_profile_id$ = val;
  this.router.navigate([`${STANDARD_ROUTES.reliefProfiles}/${val}`])
  }
  onDeletedIconClicked(val){

  }

  onCancelEditor(){
    this.store.dispatch(new HideEditorRelief());
  }
}
