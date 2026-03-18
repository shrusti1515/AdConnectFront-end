import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // ========================
  // ADMAKERS
  // ========================

  getAdmakers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Client/browse-admakers`, { withCredentials: true });
  }

  getAdmakerProfile(id: any) {
    return this.http.get(`${this.baseUrl}/Client/admaker-profile/${id}`, { withCredentials: true });
  }

  searchAdmakers(filters: any): Observable<any> {

    let params = new HttpParams();

    if (filters.service)
      params = params.set('Service', filters.service);

    if (filters.minBudget)
      params = params.set('MinBudget', filters.minBudget);

    if (filters.maxBudget)
      params = params.set('MaxBudget', filters.maxBudget);

    if (filters.minRating)
      params = params.set('MinRating', filters.minRating);

    if (filters.minExperience)
      params = params.set('MinExperience', filters.minExperience);

    return this.http.get(`${this.baseUrl}/Client/search`, {
      params: params,
      withCredentials: true
    });
  }

  // ========================
  // PROJECTS
  // ========================

  getMyProjects(clientId: number) {
    return this.http.get(`${this.baseUrl}/Client/my-projects/${clientId}`, {
      withCredentials: true
    });
  }

  createProject(data: any) {
    return this.http.post(`${this.baseUrl}/Client/create-project`, data, {
      withCredentials: true
    });
  }

  getProjectDetails(projectId: number) {
    return this.http.get(`${this.baseUrl}/Client/project-details/${projectId}`, {
      withCredentials: true
    });
  }

  // ========================
// NEGOTIATION
// ========================

startNegotiation(data:any){
  return this.http.post(
    `${this.baseUrl}/Negotiation/start`,
    data,
    { withCredentials:true }
  );
}

replyNegotiation(data:any){
  return this.http.post(
    `${this.baseUrl}/Negotiation/reply`,
    data,
    { withCredentials:true }
  );
}


finalizeNegotiation(projectId:number, finalAmount:number){

const body={
projectId:projectId,
finalAmount:finalAmount,
senderRole:"Client"
};

return this.http.post(
`${this.baseUrl}/Negotiation/finalize`,
body,
{withCredentials:true}
);

}

  // ========================
  // PAYMENT
  // ========================

  createPayment(data:any){
    return this.http.post(`${this.baseUrl}/Payment/create`,data,{withCredentials:true});
  }

  updatePaymentStatus(data:any){
    return this.http.put(`${this.baseUrl}/Payment/update-status`,data,{withCredentials:true});
  }

  // ========================
  // PROJECT WORKFLOW
  // ========================

  startProject(projectId:number, admakerId:number){
    return this.http.put(`${this.baseUrl}/Project/start/${projectId}/${admakerId}`,{},{withCredentials:true});
  }

  completeProject(projectId:number, admakerId:number){
    return this.http.put(`${this.baseUrl}/Project/complete/${projectId}/${admakerId}`,{},{withCredentials:true});
  }

  
  closeProject(projectId:number, clientId:number){
    return this.http.put(`${this.baseUrl}/Project/close/${projectId}/${clientId}`,{},{withCredentials:true});
  }


  

  // ========================
  // REVIEW
  // ========================

  addReview(data:any){
    return this.http.post(`${this.baseUrl}/Review/add`,data,{withCredentials:true});
  }


  // ========================
// INVOICE
// ========================

getInvoice(paymentId:number){
return this.http.get(
`${this.baseUrl}/Payment/invoice/${paymentId}`,
{withCredentials:true}
);
}


// ========================
// RECEIPT
// ========================

generateReceipt(paymentId:number){
return this.http.post(
`${this.baseUrl}/Payment/generate-receipt/${paymentId}`,
{},
{withCredentials:true}
);
}

getReceipt(paymentId:number){
return this.http.get(
`${this.baseUrl}/Payment/receipt/${paymentId}`,
{withCredentials:true}
);
}
  
}
