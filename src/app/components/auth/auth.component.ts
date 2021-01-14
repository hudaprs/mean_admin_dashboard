import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  name: string = '';
  email: string = '';
  password: string = '';
  loading: boolean = false;
  isLoginMode: boolean = true;
  authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authSubscription = this.authService.authSubject.subscribe((auth) => {
      if (auth?.token) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    if (!this.email || !this.password) {
      return this.snackbarService.openSnackbar('Please fill all forms');
    }

    this.loading = true;

    let authObservable: Observable<any>;

    if (this.isLoginMode) {
      authObservable = this.authService.login({
        email: this.email,
        password: this.password,
      });
    } else {
      authObservable = this.userService.createUser({
        name: this.name,
        email: this.email,
        password: this.password,
      });
    }

    authObservable.subscribe(
      (_) => {
        this.loading = false;
        this.snackbarService.openSnackbar(
          this.isLoginMode ? 'Login Success' : 'Register Success'
        );
        if (!this.isLoginMode) this.isLoginMode = true;
      },
      (err) => {
        this.loading = false;
        this.snackbarService.openSnackbar(err.error.message);
      }
    );
  }

  switchMode(payload) {
    this.isLoginMode = payload;
    this.name = '';
    this.email = '';
    this.password = '';
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
