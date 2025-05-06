import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../registration.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BootstrapOptions } from '@angular/core';
import bootstrap from '../../main.server';
  


interface RegistrationData {
  name: string;
  email: string;
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  formData = { email: '', name: '' };
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  @ViewChild('bookingModal') bookingModal: ElementRef | undefined;

  constructor(private registrationService: RegistrationService) {}

  onSubmit() {
    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;
    alert('registration successful');
    console.log(this.formData);
    this.registrationService.registerUser(this.formData).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Registration successful!';
        this.formData = { email: '', name: '' }; // Reset form
        
        // Hide the modal if it exists
        /*if (this.bookingModal) {
          const modal = new bootstrap.Modal(this.bookingModal.nativeElement);
          modal.hide();
        }*/
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'An error occurred during registration.';
        }
      }
    });
  }
}
