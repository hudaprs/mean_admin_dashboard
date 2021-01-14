import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() sidenav;

  constructor(private authService: AuthService) {}

  toggleSidenav() {
    this.sidenav.toggle();
  }

  onLogout(event) {
    event.preventDefault();

    this.authService.logout();
  }
}
