import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = 'http://localhost:6000/customers';

  constructor(private http:HttpClient) { }

  getData():Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
  

  }


postData(payload: any): Observable<any>{
  return this.http.post(`${this.apiUrl}/submit`,payload);
}

}

