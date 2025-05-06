import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InquiryComponent } from '../../inquiry/inquiry.component';
/*interface TourPlan {
  First_Name: string;
  Last_Name: string;
  Email: string;
  Phone_Number: string;
  Where_would_you_like_to_go?: string;
  When_would_you_like_to_depart:Date; 
  When_would_you_like_to_return:Date;
  Are_Your_Dates_Flexible:Boolean;
  What_is_your_departure_city:string;
  How_many_travelers:number;
  If_traveling_with_children_under_18_please_list_their_ages:string;
  message:string;
}*/
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule,InquiryComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
/*
  Start_Planning_Tours: TourPlan ={
    First_Name: "",
    Last_Name: "",
    Email:"",
    Phone_Number:"",
    Where_would_you_like_to_go: "",
    When_would_you_like_to_depart: new Date(),
    When_would_you_like_to_return: new Date(),
    Are_Your_Dates_Flexible:false,
    What_is_your_departure_city:"",
    How_many_travelers: 0,
    If_traveling_with_children_under_18_please_list_their_ages:"",
    message:"",

   
  }

  onSubmit(formValue: any){
    console.log('Form submitted:', formValue);
    console.log(formValue);
   alert('inquiry submitted');


  
  
  }
*/


}

