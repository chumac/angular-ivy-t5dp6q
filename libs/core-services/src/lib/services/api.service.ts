import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';

import { IApiResult } from '@nutela/models/core-data';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  version: string;
  config = null;
  apiBaseURL = null;

  constructor(private http: HttpClient) { }

  create(endpointUrl: string, body: any): Observable<IApiResult> {
    return this.http.post<IApiResult>(`${this.apiBaseURL}${endpointUrl}`, body);
  }

  read(endpointUrl: string): Observable<IApiResult> {
    return this.http.get<IApiResult>(`${this.apiBaseURL}${endpointUrl}`);
  }

  update(endpointUrl: string, body: any): Observable<IApiResult> {
    return this.http.put<IApiResult>(`${this.apiBaseURL}${endpointUrl}`, body);
  }

  delete(endpointUrl: string): Observable<IApiResult> {
    return this.http.delete<IApiResult>(`${this.apiBaseURL}${endpointUrl}`);
  }
}
