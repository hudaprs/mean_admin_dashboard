import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, take, catchError } from 'rxjs/operators';
import { Auth } from '../models/auth.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authSubject = new BehaviorSubject<Auth>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(authData: { email: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:5000/api/auth', authData).pipe(
      tap((loginData: { token: string; refreshToken: string; user: any }) => {
        const { token, refreshToken, user } = loginData;
        const auth = new Auth(token, refreshToken, user._id);
        this.authSubject.next(auth);
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', user._id);
        this.router.navigate(['/']);
      }),
      catchError((err) => throwError(err))
    );
  }

  autoLogin(): Observable<any> | void {
    const { token, refreshToken, userId } = localStorage;
    let auth = new Auth(token, refreshToken, userId);
    this.authSubject.next(auth);
  }

  reLogin(reloginData: { refreshToken: string; userId: string }) {
    const { refreshToken, userId } = reloginData;

    return this.http
      .get(
        `http://localhost:5000/api/tokens/refresh?refreshToken=${refreshToken}&userId=${userId}`,
        { observe: 'response' }
      )
      .pipe(
        tap((loginData) => loginData),
        catchError((err) => throwError(err))
      );
  }

  logout(): void {
    this.authSubject.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    this.router.navigate(['/auth']);
  }
}
