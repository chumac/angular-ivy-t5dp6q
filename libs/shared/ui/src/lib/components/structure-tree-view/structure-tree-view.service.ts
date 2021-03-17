import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiService } from '@nutela/core-services';

@Injectable()
export class StructureTreeViewService {

  public url = '/api/enterprise-structure/tree/hr/get';

  constructor(private apiService: ApiService) { }

  fetchUrl(id): Observable<any> {
    return this.apiService.read(`${this.url}/${id}`);
  }

}
