import { Injectable } from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { switchMap, tap, take, exhaustMap, catchError } from 'rxjs/operators';

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
  reLoginSubcription: Subscription;

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
          console.error('ERROR FROM INTERCEPTOR: UNAUTHORIZED', err);

          return this.refreshAccessToken().pipe(
            switchMap((refreshTokenResponse: { body: any }) => {
              const modifiedRequest = req.clone({
                headers: new HttpHeaders({
                  Authorization: `Bearer ${refreshTokenResponse.body.token}`,
                }),
              });
              localStorage.clear();
              localStorage.setItem('token', refreshTokenResponse.body.token);
              localStorage.setItem(
                'refreshToken',
                refreshTokenResponse.body.refreshToken
              );
              localStorage.setItem(
                'userId',
                refreshTokenResponse.body.user._id
              );
              let auth = new Auth(
                refreshTokenResponse.body.token,
                refreshTokenResponse.body.refreshToken,
                refreshTokenResponse.body.user._id
              );
              this.authService.authSubject.next(auth);
              return next.handle(modifiedRequest);
            }),
            catchError((err) => {
              console.log('ERROR WHEN REFRESH TOKEN');
              this.authService.logout();
              return throwError(err);
            })
          );
        }
        return throwError(err);
      })
    );
  }

  private refreshAccessToken() {
    return this.authService
      .reLogin({
        refreshToken: localStorage.refreshToken,
        userId: localStorage.userId,
      })
      .pipe(tap((token) => token));
  }
}
