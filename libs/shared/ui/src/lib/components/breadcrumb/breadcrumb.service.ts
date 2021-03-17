import { Injectable } from '@angular/core';
import { ApiService } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  createChildren: any;
  rootParent: number;

  constructor(private apiService: ApiService, ) {
  }
}
