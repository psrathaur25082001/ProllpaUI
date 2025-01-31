import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RolloutDashboardComponent } from './components/dashboard/rollout-dashboard/rollout-dashboard.component';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';


const routes: Routes = [
  { path: '', component: LoginComponent },  // Default route for login
  { path: 'rolloutDashboard', component: RolloutDashboardComponent}, 
  { path: 'adminDashboard', component: AdminDashboardComponent}, 
  { path: '**', redirectTo: '' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
