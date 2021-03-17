import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { UUID } from 'angular2-uuid';

export interface IComponent {
  id: string;
  componentRef: string;
}

@Injectable()
export class ReportDashboardService {
  public options: GridsterConfig = {
    draggable: {
      enabled: true
    },
    pushItems: true,
    resizable: {
      enabled: true
    }
  };
  public layout: GridsterItem[] = [];
  public components: IComponent[] = [];

  dropId: string;

  public defaultState: any[] = [
    {
      items: [
        {
          component: 'dashboard enum1',
          id: 'barchart'
        }
      ]
    },
    {
      items: [
        {
          component: 'dashboard enum2',
          id: 'piechart'
        }
      ]
    },
  ]

  private subject = new BehaviorSubject<any[]>(this.defaultState);
  public tracks$ = this.subject.asObservable();

  constructor() {}



  removeItem = (item: any) => {
    const state = this.subject.getValue();

    state.forEach(track => {
      track.items.forEach((i, index) => {
        if (i === item) {
          track.items.splice(index, 1);
        }
      })
    });

    this.subject.next(state);
  }

  // From https://itnext.io/build-an-enterprise-scalable-dashboard-using-angular-part-2-104acc38bea3
  addSingleItem = (item: any) => {
    const state = this.subject.getValue();

    if(state[0].items.indexOf(item) !== -1 || state[1].items.indexOf(item) !== -1) {
      console.warn('item with the same id exists on the dashboard.');
      return
    }

    state[0].items.length <= state[1].items.length ? state[0].items.push(item) : state[1].items.push(item);

    this.subject.next(state);
  }

  // From https://medium.com/javascript-in-plain-english/drag-and-drop-dashboard-builder-with-angular-and-gridster-a07592e54ce2
  addItem(): void {
    this.layout.push({
      cols: 5,
      id: UUID.UUID(),
      rows: 5,
      x: 0,
      y: 0
    });
  }

  deleteItem(id: string): void {
    const item = this.layout.find(d => d.id === id);
    const comp = this.components.find(c => c.id === id);

    this.layout.splice(this.layout.indexOf(item), 1);
    this.components.splice(this.components.indexOf(comp), 1);
  }

  setDropId(dropId: string): void {
    this.dropId = dropId;
  }

  dropItem(dragId: string): void {
    const { components } = this;
    const comp: IComponent = components.find(c => c.id === this.dropId);

    const updateIdx: number = comp ? components.indexOf(comp) : components.length;
    const componentItem: IComponent = {
      id: this.dropId,
      componentRef: dragId
    };
    this.components = Object.assign([], components, { [updateIdx]: componentItem });
  }

  getComponentRef(id: string): string {
    const comp = this.components.find(c => c.id === id);
    return comp ? comp.componentRef : null;
  }
}
