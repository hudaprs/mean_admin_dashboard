import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Auth } from '../models/auth.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authSubject = new BehaviorSubject<Auth>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(authData: { email: string; password: string }): Observable<any> {
    return this.http.post('http://localhost:5000/api/auth', authData).pipe(
      tap((token: string) => {
        const auth = new Auth(token);
        this.authSubject.next(auth);
        localStorage.setItem('token', token);
        this.router.navigate(['/']);
      }),
      catchError((err) => throwError(err))
    );
  }

  autoLogin(): Observable<any> {
    let auth = new Auth(localStorage.token);
    this.authSubject.next(auth);
    return this.http
      .get('http://localhost:5000/api/auth')
      .pipe(catchError((err: HttpErrorResponse) => throwError(err)));
  }

  logout(): void {
    this.authSubject.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }
}
