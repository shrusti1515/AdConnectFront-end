import { Routes } from '@angular/router';

import { AdminLayout } from './layout/admin-layout/admin-layout';
import { DashboardComponent  } from './pages/dashboard/dashboard';
import { UsersComponent } from './pages/users/users';
import { ProjectsComponentt } from './pages/projects/projects';
import { PaymentsComponent } from './pages/payments/payments';
import { ReportsComponent } from './pages/reports/reports';
import { Activity } from './pages/activity/activity';
import { VerificationsComponent } from './pages/verifications/verifications';
// import { AdminMonitorComponent } from './pages/monitor/monitor';
 

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'users', component: UsersComponent },
      // { path: 'monitor', component: AdminMonitorComponent },
      
      { path: 'verifications', component: VerificationsComponent },

      {path:'projects',loadComponent:()=>import('./pages/projects/projects').then(m=>m.ProjectsComponentt)},

      {path:'payments',loadComponent:()=>import('./pages/payments/payments').then(m=>m.PaymentsComponent)},

      {path:'reports',loadComponent:()=>import('./pages/reports/reports').then(m=>m.ReportsComponent)},
// {path:'reports',loadComponent:()=>import('./pages/reports/reports').then(m=>m.ReportsComponent)},

// {path:'activity',loadComponent:()=>import('./pages/activity/activity').then(m=>m.ActivityComponent)},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

