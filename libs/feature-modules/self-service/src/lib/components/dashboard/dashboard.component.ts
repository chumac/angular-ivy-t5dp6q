import { Component, OnInit, Inject } from '@angular/core';

import { slideUpAnimation } from '@nutela/shared/animations';
import { Title } from '@angular/platform-browser';

import * as constants from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-ss-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [slideUpAnimation],
  host: {
    '[@slideUpAnimation]': ''
  }
})
export class DashboardComponent implements OnInit {
  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title
  ) {
    titleService.setTitle(
      `${'Self Service Dashboard'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {}
}
