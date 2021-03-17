
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { slideUpAnimation } from '@nutela/shared/animations';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { EnterpriseStructureSharedDataService } from '../../services';
import { STANDARD_ROUTES } from '@nutela/shared/app-global';
import { getSelectedRows, getStructureNameAndId, LoadStructureNameAndIdData, LoadSelectedRowsData } from '../../store/enterprise-structure-detail';
import { pipe, Observable } from 'rxjs';
import { IEnterpriseStructureState } from '../../store/root';
import { Store } from '@ngrx/store';
import { IEnterpriseStructureDetail, INameAndId } from '../../models/interfaces';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-es-manage-detail-dashboard',
  templateUrl: './manage-detail-dashboard.component.html',
  styleUrls: ['./manage-detail-dashboard.component.scss'],
  animations: [slideUpAnimation],
  host: {
    '[@slideUpAnimation]': ''
  }
})
export class ManageDetailDashboardComponent implements OnInit {


  selectedDetails$: Observable<IEnterpriseStructureDetail[]>;
  structureNameAndId$: Observable<INameAndId>;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    public router: Router,
    private dataShare: EnterpriseStructureSharedDataService,
    private store: Store<IEnterpriseStructureState>
  ) {
    titleService.setTitle(
      `${'Manage Enterprise Structure Detail'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
  }
  storeSelects() {
    this.selectedDetails$ = this.store.select(pipe(getSelectedRows))
    this.structureNameAndId$ = this.store.select(pipe(getStructureNameAndId))
  }

  goBack() {
    this.structureNameAndId$.pipe(take(1)).subscribe(val => {

      this.router.navigate([`${STANDARD_ROUTES.enterpriseStructureDetails}/${val.name}/${val.id}`])
      this.store.dispatch(new LoadSelectedRowsData(null));
    })
  }

}
