import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiConstantService } from '../services/api-constant.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private jwtToken: string | null = null;
  

  constructor(private http: HttpClient) {}

  // authenticateUser(payload: { username: string; password: string }): Observable<any> {
  //   // Create headers explicitly (optional since HttpClient defaults to application/json)
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
  //   // Send the POST request with the username and password
  //   return this.http.post<any>(environment.apiUrl+ApiConstantService.getJwtToken, payload, { headers });
  // }
  authenticateUser(payload: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return new Observable((observer) => {
      this.http.post<any>(environment.apiUrl + ApiConstantService.getJwtToken, payload, { headers }).subscribe(
        (response) => {
          if (response.jwtToken) {
            this.jwtToken = response.jwtToken; // Save token
          }
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
  getUserDetailsByUsername(username: string): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token is not available. Please authenticate first.');
    }
  
    const headers = new HttpHeaders({
     // 'Authorization': `Bearer ${this.jwtToken}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.get<any>(`${environment.apiUrl + ApiConstantService.getUserDetailsByUsername}?username=${username}`, { headers });
  }
  getUserRoleByUserId(userId: string): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token is not available. Please authenticate first.');
    }

    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${this.jwtToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(`${environment.apiUrl + ApiConstantService.getUserRoleByUserId}/${Number(userId)}`, {
      headers
    });
  }
  getRoleList(): Observable<any> {
    if (this.jwtToken) {
      const headers = new HttpHeaders({
        // 'Authorization': `Bearer ${this.jwtToken}`,
        'Content-Type': 'application/json'
      });
  
      return this.http.get<any>(`${environment.apiUrl + ApiConstantService.getRoleList}`, {
        headers
      });
    } else {
      // Handle the case where the token is missing
      return throwError('JWT token is missing. Please log in again.');
    }
  }
  getRoleByRoleId(roleId: string ): Observable<any> {
    if (this.jwtToken) {
      const headers = new HttpHeaders({
        // 'Authorization': `Bearer ${this.jwtToken}`,
        'Content-Type': 'application/json'
      });
  
      return this.http.get<any>(`${environment.apiUrl + ApiConstantService.getRoleByRoleId}/${Number(roleId)}`, {
        headers
      });
    } else {
      // Handle the case where the token is missing
      return throwError('JWT token is missing. Please log in again.');
    }
  }
  getToken(): string | null {
    return this.jwtToken;
  }
    
}
