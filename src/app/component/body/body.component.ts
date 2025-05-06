import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from '../../registration/registration.component';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [FormsModule, CommonModule, RegistrationComponent], 
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  
}