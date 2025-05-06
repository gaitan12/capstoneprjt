import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private CustomerApiUrl = 'http://localhost:3000/packages';
  constructor(private http:HttpClient) { }

  newpackage(packages: {category: string, price: number, destination: string, description: string}): Observable<any> {
    return this.http.post<any>(this.CustomerApiUrl, packages);
  }

 /* droppackage(dropPackage: {category: string, price: number, destination: string, description: string}): Observable<any> {
    return this.http.delete<any>(this.CustomerApiUrl, dropPackage);
  }*/
  droppackage(packageId: number): Observable<any> {
    return this.http.delete<any>(`${this.CustomerApiUrl}/packages/${packageId}`);
  }
  
  

}
