import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import User from '../models/user.model';

import { SnackbarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  usersSubject = new BehaviorSubject<any>(null);
  users: any;

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {}

  getUsers(options?: any): Observable<any> {
    return this.http
      .get(`http://localhost:5000/api/users`, {
        params: options,
      })
      .pipe(
        tap((users: User[]) => {
          this.usersSubject.next(users);
        }),
        catchError((err: HttpErrorResponse): any => {
          return throwError(err);
        })
      );
  }

  createUser(userData: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post('http://localhost:5000/api/users', userData).pipe(
      tap((user) => user),
      catchError((err) => throwError(err))
    );
  }

  updateUser(userData: { name: string; id?: string }): Observable<any> {
    return this.http
      .put(`http://localhost:5000/api/users/${userData.id}`, userData)
      .pipe(
        tap((user) => {
          this.snackbarService.openSnackbar('User updated');

          return user;
        }),
        catchError((err) => throwError(err))
      );
  }

  getUser(userId: string) {
    return this.http.get(`http://localhost:5000/api/users/${userId}`).pipe(
      tap((user) => this.usersSubject.next(user)),
      catchError((err) => throwError(err))
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/api/users/${id}`).pipe(
      tap((user: User) => {
        const filteredUsers = {
          ...this.usersSubject.getValue(),
          data: this.usersSubject
            .getValue()
            .data.filter((filteredData) => filteredData._id !== user._id),
        };

        this.usersSubject.next(filteredUsers);
        this.snackbarService.openSnackbar('User deleted');
      }),
      catchError((err: HttpErrorResponse) => throwError(err))
    );
  }
}
