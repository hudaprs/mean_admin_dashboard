import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { take, exhaustMap, catchError } from 'rxjs/operators';

import {
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Auth } from '../models/auth.model';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('INTERCEPTOR', req);
    return this.authService.authSubject.pipe(
      take(1),
      exhaustMap((auth: Auth) => {
        if (auth) {
          const modifiedRequest = req.clone({
            headers: new HttpHeaders({
              Authorization: `Bearer ${auth?.token}`,
            }),
          });
          return next.handle(modifiedRequest);
        }

        return next.handle(req);
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.authService.logout();
          console.error('ERROR FROM INTERCEPTOR: UNAUTHORIZED', err);
          return throwError(err);
        }

        console.error('ERROR FROM INTERCEPTOR', err);
        return throwError(err);
      })
    );
  }
}
