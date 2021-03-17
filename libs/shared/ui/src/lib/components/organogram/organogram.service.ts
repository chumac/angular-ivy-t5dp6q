import { Injectable } from '@angular/core';
import { ApiService } from '@nutela/core-services';

@Injectable({
  providedIn: 'root'
})
export class OrganogramService {
  constructor(private apiService: ApiService, ) {
  }

}
