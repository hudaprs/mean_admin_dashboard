import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { InitializeService } from '../../../services/initialize.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,
    private initializeService: InitializeService,
    private router: Router
  ) {}

  onCancel() {
    this.name = '';
    this.email = '';
    this.password = '';
  }

  onSubmit(event) {
    event.preventDefault();

    // Simple validation
    if (!this.name || !this.email || !this.password) {
      return this.snackbarService.openSnackbar('Please fill all forms');
    }

    let newUser = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.initializeService.setLoading(true);
    this.userService.createUser(newUser).subscribe(
      (_) => {
        this.initializeService.setLoading(false);
        this.router.navigate(['/']);
      },
      (err: HttpErrorResponse): void => {
        this.initializeService.setLoading(false);
        console.error(err);
        this.snackbarService.openSnackbar(err.error.message);
      }
    );
  }
}
