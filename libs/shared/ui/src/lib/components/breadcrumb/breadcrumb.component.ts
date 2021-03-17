import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { BreadcrumbService } from './breadcrumb.service';
import { Params } from '@angular/router';


@Component({
  selector: 'x365-shared-ui-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  providers: [BreadcrumbService]
})
export class BreadcrumbComponent implements OnInit {
  message = '';
  @Input() breadcrumb: IBreadCrumb[];

  currentItem: any;
  structureID: number;

  dataSource: any;

  @Input() public show: boolean;
  @Input() public width: number;

  constructor(public utilService: UtilService, private cd: ChangeDetectorRef, public fs: BreadcrumbService) { }

  ngOnInit() {
    console.log(this.breadcrumb);
  }

}

export interface IBreadCrumb {
  label: string;
  url: string;
  params: Params;
};
