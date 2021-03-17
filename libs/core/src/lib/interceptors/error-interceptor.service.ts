import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor
{

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        event => { },
        error => {
          if (error instanceof HttpErrorResponse) {
            console.log('INTERCEPT: ', error.message, error.name, request.url , new Date());
          }
        }
      ));
  }
}
