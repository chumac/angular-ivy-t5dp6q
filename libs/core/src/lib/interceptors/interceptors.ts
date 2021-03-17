import {HTTP_INTERCEPTORS} from '@angular/common/http';

import { ErrorInterceptor } from './error-interceptor.service';

export const interceptorProviders =
   [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];
