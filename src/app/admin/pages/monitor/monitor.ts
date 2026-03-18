// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AdminService } from '../../services/admin.service';
// import { ToastService } from '../../../shared/services/toast.service';

// import {
//   MonitorSummary,
//   MonitorProject,
//   MonitorPayment
// } from '../../../models/admin-monitor.models';

// @Component({
//   selector: 'app-monitor',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './monitor.html',
//   styleUrls: ['./monitor.css']
// })
// export class AdminMonitorComponent implements OnInit {
// summary?: MonitorSummary;

//   projects: MonitorProject[] = [];
//   payments: MonitorPayment[] = [];

//   projectStatusFilter = '';
//   paymentStatusFilter = '';

//   constructor(private adminService: AdminService,private toast: ToastService) {}

//   ngOnInit(): void {

//     this.loadSummary();
//     this.loadProjects();
//     this.loadPayments();

//   }

//   loadSummary() {

//     this.adminService.getSummary().subscribe({
//       next: res => this.summary = res
//     });

//   }

//   loadProjects(status?: string) {

//     this.adminService.getProjects(status).subscribe({
//       next: res => this.projects = res
//     });

//   }

//   loadPayments(status?: string) {

//     this.adminService.getPayments(status).subscribe({
//       next: res => this.payments = res
//     });

//   }

//   filterProjects(status: string) {

//     this.projectStatusFilter = status;

//     if (status === '') {
//       this.loadProjects();
//     } else {
//       this.loadProjects(status);
//     }

//   }

//   filterPayments(status: string) {

//     this.paymentStatusFilter = status;

//     if (status === '') {
//       this.loadPayments();
//     } else {
//       this.loadPayments(status);
//     }

//   }

//   changeProjectStatus(project: MonitorProject, status: string) {

//   this.adminService.updateProjectStatus(project.id, status).subscribe({

//     next: () => {

//       project.status = status;

//       this.toast.show('Project status updated');

//     },

//     error: () => {

//       this.toast.show('Update failed');

//     }

//   });

// }

//   changePaymentStatus(payment: MonitorPayment, status: string) {

//   this.adminService.updatePaymentStatus(payment.id, status).subscribe({

//     next: () => {

//       payment.status = status;

//       this.toast.show('Payment status updated');

//     },

//     error: () => {

//       this.toast.show('Update failed');

//     }

//   });

// }

// }