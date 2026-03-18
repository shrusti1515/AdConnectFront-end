import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


// import {
//   MonitorSummary,
//   MonitorProject,
//   MonitorPayment,
//   ProjectDetail
// } from '../../models/admin-monitor.models';







@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private api = environment.apiUrl + '/admin';

  constructor(private http: HttpClient) {}

  // ===============================
  // DASHBOARD
  // ===============================
  getDashboardStats() {
  return this.http.get<{
    success: boolean;
    stats: {
      totalUsers: number;
      clients: number;
      admakers: number;
      active: number;
      inactive: number;
    }
  }>(`${this.api}/dashboard`, {
    withCredentials: true
  });
}


// ===============================
// USERS MANAGEMENT
// ===============================

getUsers(role?: string) {
  let url = `${this.api}/users`;
  if (role) {
    url += `?role=${role}`;
  }

  return this.http.get<{
    success: boolean;
    count: number;
    data: any[];
  }>(url, { withCredentials: true });
}

getUserById(id: number) {
  return this.http.get<{
    success: boolean;
    data: any;
  }>(`${this.api}/user/${id}`, { withCredentials: true });
}

activateUser(id: number) {
  return this.http.put(`${this.api}/activate/${id}`, {}, { withCredentials: true });
}

deactivateUser(id: number) {
  return this.http.put(`${this.api}/deactivate/${id}`, {}, { withCredentials: true });
}

deleteUser(id: number) {
  return this.http.delete(`${this.api}/delete/${id}`, { withCredentials: true });
}



  // ================= GET PENDING ADMakers =================
  getPendingAdmakers(): Observable<any> {
    return this.http.get(`${this.api}/pending-admakers`, { withCredentials: true });
  }

  // ================= GET ADMakers PORTFOLIOS =================
  getAdmakerPortfolios(admakerId: number): Observable<any> {
    return this.http.get(`${this.api}/admaker-portfolios/${admakerId}`, { withCredentials: true });
  }

  // ================= VERIFY ADMakers =================
  verifyAdmaker(admakerId: number, status: 'Approved' | 'Rejected'): Observable<any> {
    return this.http.post(`${this.api}/verify-admaker`, 
      { AdmakerId: admakerId, Status: status }, 
      { withCredentials: true }
    );
  }



getProjects(filters:any){

let params:any={};

if(filters.status && filters.status !== "")
params.status=filters.status;

if(filters.minBudget && filters.minBudget !== null)
params.minBudget=filters.minBudget;

if(filters.maxBudget && filters.maxBudget !== null)
params.maxBudget=filters.maxBudget;

return this.http.get(
`${this.api}/monitor/projects`,
{
params:params,
withCredentials:true
}
);

}

getProjectDetails(id:number){

return this.http.get(
`${this.api}/monitor/project/${id}`,
{withCredentials:true}
);

}

getPayments(filters:any){

let params:any={};

if(filters.status && filters.status.trim() !== "")
params.status = filters.status;

if(filters.method && filters.method.trim() !== "")
params.method = filters.method;

return this.http.get(
`${this.api}/monitor/payments`,
{
params: params,
withCredentials: true
}
);

}

getPaymentSummary(){

return this.http.get(
`${this.api}/monitor/summary`,
{withCredentials:true}
);

}

updatePaymentStatus(paymentId:number,status:string){

return this.http.put(
`${this.api}/monitor/payment-status?paymentId=${paymentId}&status=${status}`,
{},
{withCredentials:true}
);

}

updateProjectStatus(projectId:number,status:string){

return this.http.put(
`${this.api}/monitor/project-status?projectId=${projectId}&status=${status}`,
{},
{withCredentials:true}
);

}


getActivityLogs(){

return this.http.get(
`${this.api}/activity`,
{withCredentials:true}
);

}

filterActivity(action:string){

return this.http.get(
`${this.api}/activity/filter?action=${action}`,
{withCredentials:true}
);

}

getUsersReport(filter:any){

return this.http.post(
`${this.api}/reports/users`,
filter,
{withCredentials:true}
);

}

getProjectsReport(filter:any){

return this.http.post(
`${this.api}/reports/projects`,
filter,
{withCredentials:true}
);

}

getPaymentsReport(filter:any){

return this.http.post(
`${this.api}/reports/payments`,
filter,
{withCredentials:true}
);

}

getReportSummary(){
  return this.http.get(`${this.api}/reports/summary`, {withCredentials:true});
}













  // monitor

//  getSummary(): Observable<MonitorSummary> {
//     return this.http.get<MonitorSummary>(
//       `${this.api}/monitor/summary`,
//       { withCredentials: true }
//     );
//   }

//   getProjects(status?: string): Observable<MonitorProject[]> {

//   let url = `${this.api}/monitor/projects`;

//   if (status) {
//     url += `?status=${status}`;
//   }

//   return this.http.get<MonitorProject[]>(url, {
//     withCredentials: true
//   });

// }

//   getProject(id: number): Observable<ProjectDetail> {
//     return this.http.get<ProjectDetail>(
//       `${this.api}/monitor/project/${id}`,
//       { withCredentials: true }
//     );
//   }

//  getPayments(status?: string): Observable<MonitorPayment[]> {

//   let url = `${this.api}/monitor/payments`;

//   if (status) {
//     url += `?status=${status}`;
//   }

//   return this.http.get<MonitorPayment[]>(url, {
//     withCredentials: true
//   });

// }

//   updateProjectStatus(projectId: number, status: string) {
//   return this.http.put(
//     `${this.api}/monitor/project-status`,
//     {
//       id: projectId,
//       status: status
//     },
//     { withCredentials: true }
//   );
// }

// updatePaymentStatus(paymentId: number, status: string) {
//   return this.http.put(
//     `${this.api}/monitor/payment-status`,
//     {
//       id: paymentId,
//       status: status
//     },
//     { withCredentials: true }
//   );
// }



//   // ===============================
//   // Activity Logs
//   // ===============================
//   getLogs() {
//     return this.http.get(`${this.api}/activity`, {
//       withCredentials: true
//     });
//   }

//   filterLogs(action:string) {
//     return this.http.get(`${this.api}/activity/filter?action=${action}`, {
//       withCredentials: true
//     });
//   }
}