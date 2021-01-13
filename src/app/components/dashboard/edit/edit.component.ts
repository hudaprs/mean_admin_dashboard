import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { InitializeService } from '../../../services/initialize.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  name: string = '';
  user: any;
  userSubscription: Subscription;

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,
    private initializeService: InitializeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeService.setLoading(true);
    this.userService.getUser(this.route.snapshot.params.id).subscribe(
      (user: any) => {
        this.initializeService.setLoading(false);
        this.name = user.name;
      },
      (err) => {
        this.initializeService.setLoading(false);
        console.error(err);
      }
    );

    this._onUserChange();
  }

  onSubmit(event) {
    event.preventDefault();

    // Simple validation
    if (!this.name) {
      return this.snackbarService.openSnackbar('Please fill all forms');
    }

    let existedUser = {
      id: this.route.snapshot.params.id,
      name: this.name,
    };

    this.initializeService.setLoading(true);
    this.userService.updateUser(existedUser).subscribe(
      (_) => {
        this.router.navigate(['/']);
      },
      (err: HttpErrorResponse): void => {
        this.initializeService.setLoading(false);
        console.error(err);
        this.snackbarService.openSnackbar(err.error.message);
      }
    );
  }

  private _onUserChange() {
    this.userSubscription = this.userService.usersSubject.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe;
  }
}
