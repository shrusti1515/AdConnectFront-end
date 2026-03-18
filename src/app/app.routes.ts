import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

import { AdminLayout } from './admin/layout/admin-layout/admin-layout';
import { DashboardComponent } from './admin/pages/dashboard/dashboard';
import { UsersComponent } from './admin/pages/users/users';
import { VerificationsComponent } from './admin/pages/verifications/verifications';
import { ProjectsComponentt } from './admin/pages/projects/projects';
import { PaymentsComponent } from './admin/pages/payments/payments';
import { ReportsComponent } from './admin/pages/reports/reports';
// import { AdminMonitorComponent } from './admin/pages/monitor/monitor';

import { ClientLayout } from './client/layout/client-layout';
import { ClientDashboard } from './client/dashboard/client-dashboard';
import { BrowseAdmakersComponent } from './client/browse-admakers/browse-admakers';
import { ProjectsComponent } from './client/projects/projects';
import { ProjectDetailComponent } from './client/project-detail/project-detail';
import { PaymentSuccessComponent } from './client/payment-success/payment-success';

import { AdmakerLayout } from './admaker/layout/admaker-layout';

export const routes: Routes = [

  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'verifications', component: VerificationsComponent },
      {path:'projects',loadComponent:()=>import('./admin/pages/projects/projects').then(m=>m.ProjectsComponentt)},
      {path:'payments',loadComponent:()=>import('./admin/pages/payments/payments').then(m=>m.PaymentsComponent)},
      {path:'reports',loadComponent:()=>import('./admin/pages/reports/reports').then(m=>m.ReportsComponent)},
      // { path: 'monitor', component: AdminMonitorComponent}
      ]
  },

  {
    path:'client',
    component: ClientLayout,
    children:[
      { path:'dashboard', component:ClientDashboard},
      {
          path: 'browse-admakers',
          loadComponent: () => import('./client/browse-admakers/browse-admakers')
          .then(m => m.BrowseAdmakersComponent)
      },
      {
        path:'admaker-profile/:id',
        loadComponent: () =>
        import('./client/admaker-profile/admaker-profile')
        .then(m => m.AdmakerProfileComponent)
      },
      {
        path:'create-project/:admakerId',
        loadComponent:() =>
        import('./client/create-project/create-project')
        .then(m => m.CreateProjectComponent)
      },
      {
        path:'projects',
        loadComponent:() =>
        import('./client/projects/projects')
        .then(m => m.ProjectsComponent)
      },
      {
        path:'my-projects',
        loadComponent:() =>
        import('./client/projects/projects')
        .then(m => m.ProjectsComponent)
      },
      {
        path:'project/:id',
        loadComponent:() =>
        import('./client/project-detail/project-detail')
        .then(m => m.ProjectDetailComponent)
      },

      {
  path: 'payment',
  loadComponent: () => import('./client/payment/payment')
  .then(m => m.PaymentComponent)
},

{
path:'payment-success/:id',
loadComponent:()=>import('./client/payment-success/payment-success')
.then(m=>m.PaymentSuccessComponent)
}

      ]
  },

  


  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register},

];


