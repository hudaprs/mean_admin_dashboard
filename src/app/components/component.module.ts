import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Layouts
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { SpinnerComponent } from './spinner.component';

// Main Component
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostComponent } from './post/post.component';
import { CreateComponent } from './dashboard/create/create.component';
import { EditComponent } from './dashboard/edit/edit.component';
import { AboutComponent } from './about/about.component';

// Material
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const components = [
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
  DashboardComponent,
  PostComponent,
  AboutComponent,
  SpinnerComponent,
  CreateComponent,
  EditComponent,
];

const coreModules = [CommonModule, RouterModule, FormsModule];

const materialModules = [
  MatDividerModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
];

@NgModule({
  imports: [...coreModules, ...materialModules],
  declarations: components,
  exports: [...components],
})
export class ComponentModule {}
