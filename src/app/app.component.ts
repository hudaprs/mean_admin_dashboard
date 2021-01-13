import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { InitializeService } from './services/initialize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  sidenavOpened: boolean = true;
  title = 'admin-dashboard';
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  layoutChangeSubscription: Subscription;
  layoutWidth: number;
  loading: boolean = false;
  loadingSubcription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private initializeService: InitializeService
  ) {}

  ngOnInit() {
    this.layoutChangeSubscription = this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((result) => {
        if (result.matches) {
          this.sidenavOpened = false;
        } else {
          this.sidenavOpened = true;
        }
      });

    this.loadingSubcription = this.initializeService.loadingSubject.subscribe(
      (loadingValue) => {
        this.loading = loadingValue;
      }
    );
  }

  ngOnDestroy() {
    this.loadingSubcription.unsubscribe();
  }
}
