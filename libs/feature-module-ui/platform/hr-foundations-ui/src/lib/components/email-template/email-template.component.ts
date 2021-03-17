import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IEmail } from '@nutela/models/foundation';
import { Observable } from 'rxjs/internal/Observable';
import { DialogBoxService } from '@nutela/shared/ui';
import { LoadEmailData } from '../../store/email/email.actions';
import { getEmailData } from '../../store/email/email.selectors';
import { IHRFoundationState } from '../../store/root';

@Component({
  selector: 'x365-fm-plf-hrf-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss']
})
export class EmailTemplateComponent implements OnInit {
  emailData$: Observable<IEmail[]>;

  constructor(private store: Store<IHRFoundationState>, private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();

  }

   storeDispatches() {
    this.store.dispatch(new LoadEmailData());
   }

 storeSelects() {
    this.emailData$ = this.store.pipe(select(getEmailData));
 }


}
