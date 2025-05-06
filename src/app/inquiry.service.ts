import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface TourPlan {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  where_would_you_like_to_go?: string;
  when_would_you_like_to_depart: Date;
  when_would_you_like_to_return: Date;
  Are_your_dates_flexible: boolean;
  what_is_your_departure_city: string;
  how_many_travelers: number;
  if_traveling_with_children_under_18_please_list_their_ages: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private InquiryApiUrl = 'http://localhost:3000/inquiries'; // Update API URL if needed

  constructor(private http: HttpClient) {}

  // FIXED: Implementing the method properly
  sendInquiry(formData: TourPlan): Observable<any> {
    return this.http.post<any>(this.InquiryApiUrl, formData);
  }
}
