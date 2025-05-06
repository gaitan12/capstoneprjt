import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-termsofterms',
  imports: [CommonModule],
  templateUrl: './termsofterms.component.html',
  styleUrl: './termsofterms.component.css'
})
export class TermsoftermsComponent {
  
  showCard = true;
 
  toggleCard() {
    this.showCard = this.showCard;
  }

}
