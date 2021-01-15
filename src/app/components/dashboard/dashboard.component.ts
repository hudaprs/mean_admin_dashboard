import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
  searchSubject: Subject<string> = new Subject();
  searchSubjectSubscription: Subscription;

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
    this._onSearchChange();
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

  onHandleSearch(event: any) {
    console.log(event.target.value);
    this.searchSubject.next(event.target.value);
  }

  onSearch(searchValue: string) {
    this.page = 1;
    this.limit = 10;
    this.paginator.pageIndex = 0;

    let query: any = {
      page: this.page,
      limit: this.limit,
    };

    if (searchValue) {
      query.name = searchValue;
    } else {
      delete query.name;
    }

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

  private _onSearchChange() {
    this.searchSubjectSubscription = this.searchSubject
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        this.onSearch(value);
      });
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
    this.searchSubjectSubscription.unsubscribe();
  }
}
