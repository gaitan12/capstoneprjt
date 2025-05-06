import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
 
  private CustomerApiUrl = 'http://localhost:1024/customers';
  
  constructor(private http: HttpClient) {}
  
  

registerUser(customers: {name: string, email: string}): Observable<any> {
  return this.http.post<any>(this.CustomerApiUrl, customers);
}

}
