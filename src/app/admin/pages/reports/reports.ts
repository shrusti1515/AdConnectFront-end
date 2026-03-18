import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class ReportsComponent {

  activeTab: string = 'users';

  summary:any = {};
  loading = false;
  data: any[] = [];
  total = 0;

  filters: any = {
    role: '',
    status: '',
    minAmount: null,
    maxAmount: null,
    fromDate: '',
    toDate: ''
  };

  constructor(
    private adminService: AdminService,
    private cd: ChangeDetectorRef,
    private toast: ToastService
  ) {}

  ngOnInit(){
    this.loadSummary();
  }

  // 🔥 LOAD REPORT BASED ON TAB
  loadReport() {

  this.loading = true;
  this.data = [];

  // 🔥 CLEAN FILTER OBJECT (IMPORTANT)
  const cleanFilter: any = {};

  Object.keys(this.filters).forEach(key => {
    const value = this.filters[key];
    if (value !== null && value !== '') {
      cleanFilter[key] = value;
    }
  });

  let apiCall;

  if (this.activeTab === 'users') {
    apiCall = this.adminService.getUsersReport(cleanFilter);
  }
  else if (this.activeTab === 'projects') {
    apiCall = this.adminService.getProjectsReport(cleanFilter);
  }
  else {
    apiCall = this.adminService.getPaymentsReport(cleanFilter);
  }

  apiCall.subscribe({
    next: (res: any) => {
      this.data = res.data || [];
      this.total = res.total || 0;
      this.loading = false;

      this.cd.detectChanges(); 
    },
    error: (err) => {
      console.log("ERROR:", err); // 🔥 DEBUG
      this.toast.show("Failed to load report");
      this.loading = false;

      this.cd.detectChanges(); 
    }
  });
}

  // 🔄 SWITCH TAB
  changeTab(tab: string) {
    this.activeTab = tab;
    this.data = [];
    this.total = 0;
  }


  loadSummary(){
  this.adminService.getReportSummary()
  .subscribe(res=>{
    this.summary = res;
  });
}

}