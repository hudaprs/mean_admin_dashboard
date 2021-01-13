import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import User from '../../models/user.model';
import { InitializeService } from '../../services/initialize.service';
import { Router } from '@angular/router';

interface DataSourceInterface {
  data: User[];
  links?: any;
  meta: { total?: number; limit?: number };
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  dataSource: DataSourceInterface;
  usersSubscription: Subscription;
  displayedColumns: string[] = ['name', 'email', 'action'];
  page: number;
  limit: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private initializeService: InitializeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeService.setLoading(true),
      this.userService.getUsers({ page: 1, limit: 10 }).subscribe(
        (_) => this.initializeService.setLoading(false),
        (err) => {
          console.error(err);
          this.initializeService.setLoading(false);
        }
      );

    this._onUserChange();
  }

  onPaginate(paginator) {
    this.page = paginator.pageIndex + 1;
    this.limit = paginator.pageSize;

    this.initializeService.setLoading(true);
    this.userService
      .getUsers({
        page: this.page,
        limit: this.limit,
      })
      .subscribe(
        (_) => this.initializeService.setLoading(false),
        (err) => console.error(err)
      );
  }

  onEdit(payload) {
    this.router.navigate([`edit`, payload._id]);
  }

  onDelete(payload) {
    if (confirm('Delete?')) {
      this.initializeService.setLoading(true);
      this.userService.deleteUser(payload._id).subscribe((_) => {
        this.initializeService.setLoading(false);
        this.initializeService.setLoading(true);
        this.userService
          .getUsers({
            page: this.page,
            limit: this.limit,
          })
          .subscribe(
            (_) => this.initializeService.setLoading(false),
            (err) => {
              console.error(err);
              this.initializeService.setLoading(false);
            }
          );
      });
    }
  }

  onFilter(event) {
    this.page = 1;
    this.limit = 10;

    let query: any = {
      page: this.page,
      limit: this.limit,
    };

    if (event.target.value) {
      query.name = event.target.value;
    } else {
      delete query.name;
    }

    this.paginator.pageIndex = 0;
    this.userService.getUsers(query).subscribe(
      (_) => this.initializeService.setLoading(false),
      (err) => {
        console.error(err);
        this.initializeService.setLoading(false);
      }
    );
  }

  private _onUserChange() {
    this.usersSubscription = this.userService.usersSubject.subscribe(
      (users) => {
        this.dataSource = users;
      }
    );
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
