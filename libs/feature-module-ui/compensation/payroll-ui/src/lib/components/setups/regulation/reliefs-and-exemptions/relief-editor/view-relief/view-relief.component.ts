import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IStaturoryRelief, ITaxRuleRelief } from '@nutela/models/compensation/payroll';
import { ISelectOption } from '@nutela/models/core-data';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { HideAddEditorRelief, HideViewEditorRelief, IReliefState, isProcessingRelief } from 'libs/feature-module-ui/compensation/payroll-ui/src/lib/store/setup/regulation/reliefs-and-exemptions';
import { IReliefCurrency } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-currency.interface';
import { IReliefProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-profile.interface';
import { Observable } from 'rxjs';
import { EditReliefService } from './edit-relief.service';

@Component({
  selector: 'x365-fm-payrl-view-relief',
  templateUrl: './view-relief.component.html',
  styleUrls: ['./view-relief.component.scss'],
  providers: [EditReliefService]
})
export class ViewReliefComponent extends BaseFormComponent implements OnInit {
  isProcessing$: Observable<boolean>;
  cutoffDaySelectOption :any;
  
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IReliefProfile;
  
  constructor( public fs: EditReliefService, public utilService: UtilService,private store: Store<IReliefState>) { 
    super();
  }

  ngOnInit() {
  }

  onDoneClicked(){
    this.store.dispatch(new HideViewEditorRelief());
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }
}