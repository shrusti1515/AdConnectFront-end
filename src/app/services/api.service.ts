import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// ✅ import environment
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // ✅ now reads from environment file
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // =========================
  // GET
  // =========================
  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  // =========================
  // POST
  // =========================
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  // =========================
  // PUT
  // =========================
  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}`, data, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  // =========================
  // DELETE
  // =========================
  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  // =========================
  // ERROR HANDLER
  // =========================
  private handleError(error: HttpErrorResponse) {

    let message = "Something went wrong";

    if (error.error instanceof ErrorEvent)
      message = error.error.message;

    else if (error.error?.message)
      message = error.error.message;

    return throwError(() => message);
  }
}