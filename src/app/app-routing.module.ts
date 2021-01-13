import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostComponent } from './components/post/post.component';
import { AboutComponent } from './components/about/about.component';
import { CreateComponent } from './components/dashboard/create/create.component';
import { EditComponent } from './components/dashboard/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: 'posts',
    component: PostComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
