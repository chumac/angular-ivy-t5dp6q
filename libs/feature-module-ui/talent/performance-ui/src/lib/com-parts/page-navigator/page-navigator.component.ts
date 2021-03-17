import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPageNavigatorData } from '../../models';
import { PagemarkItemTypes } from '../../enumerations';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { take } from 'rxjs/operators';
import { RoleTypes } from '../../enumerations';


@Component({
  selector: 'x365-fm-talent-page-navigator',
  templateUrl: './page-navigator.component.html',
  styleUrls: ['./page-navigator.component.scss']
})
export class PageNavigatorComponent implements OnInit {
  @Input() public list: IPageNavigatorData[];

  @Output() buttonClicked = new EventEmitter<IPageNavigatorData>();
  @Output() reOpenIconClicked = new EventEmitter<IPageNavigatorData>();

  selectedItemId: number;
  roles: any = RoleTypes;
  

  constructor(private dialogBoxService: DialogBoxService) { }

  ngOnInit() { 
  }

  itemClicked(item: IPageNavigatorData) {
    if (item) {
      this.selectedItemId = item.id;
    }
    this.buttonClicked.emit(item);
  }

  select(item: IPageNavigatorData) {
    this.itemClicked(item);
  }

  itemTracker(index: number, item: IPageNavigatorData) {
    return item ? item.id : null;
  }

  getType(index: number, count: number): PagemarkItemTypes {
    if (index === 0) {
      return PagemarkItemTypes.FIRST;
    } else if (index === (count-1)) {
      return PagemarkItemTypes.LAST;
    } else {
      return PagemarkItemTypes.NORMAL;
    }
  }

  isSelectedItem(id: number): boolean {
    if (this.selectedItemId === id) {
      return true;
    } else {
      return false;
    }
  }

  deSelect() {
    this.selectedItemId = -124900;
  }

  reOpenPageSection(item: IPageNavigatorData) {
    this.dialogBoxService.show(`You are about to re-open this page section.`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
            if (item) {
              this.selectedItemId = item.id;
            }
            this.reOpenIconClicked.emit(item);
        }
      });
  }

  
}
