import { Component, ViewChild, ElementRef } from '@angular/core';
import { InquiryService } from '../inquiry.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-inquiry',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css'], // FIXED: Correct property name
})
export class InquiryComponent {
  formData: TourPlan = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    where_would_you_like_to_go: '',
    when_would_you_like_to_depart: new Date(), // FIXED: Default value
    when_would_you_like_to_return: new Date(),
    Are_your_dates_flexible: false, // FIXED: Use boolean
    what_is_your_departure_city: '',
    how_many_travelers: 1, // Default to 1
    if_traveling_with_children_under_18_please_list_their_ages: '',
    message: '',
  };

  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  @ViewChild('bookingModal') bookingModal!: ElementRef; // FIXED: Added `!` to avoid initialization error

  constructor(private inquiryService: InquiryService) {} // FIXED: Removed `| undefined`

  onSubmit() {
    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;

    console.log('Submitting Form:', this.formData);

    this.inquiryService.sendInquiry(this.formData).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Inquiry submitted successfully!';
        this.resetForm();
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error?.error?.message || 'An error occurred while submitting.';
      },
    });
  }

  resetForm() {
    this.formData = {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      where_would_you_like_to_go: '',
      when_would_you_like_to_depart: new Date(),
      when_would_you_like_to_return: new Date(),
      Are_your_dates_flexible: false,
      what_is_your_departure_city: '',
      how_many_travelers: 1,
      if_traveling_with_children_under_18_please_list_their_ages: '',
      message: '',
    };
  }
}
