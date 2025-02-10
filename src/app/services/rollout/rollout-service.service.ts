import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class RolloutServiceService {
  private jwtToken: string | null;

  constructor(private http: HttpClient) {
    // Retrieve the token from localStorage in the constructor
    this.jwtToken = localStorage.getItem('jwtToken');
  }

  // Example method to return the token
  getToken(): string | null {
    return this.jwtToken;
  }

  // Example HTTP call using the token
  
}
