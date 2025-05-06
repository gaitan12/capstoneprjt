import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PackageService } from '../../package.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Params } from '@angular/router';
interface cardData{
  title: string;
  index:number;
category: string;
price: number;
destination: string;
description:string;
image:string;
}
@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css'
})
export class PackagesComponent {
  cardData: any;
  loading: boolean | undefined;
  successMessage: string | undefined;

  constructor(private packageService: PackageService) {}
  cards: cardData[] =[
      {
        index: 0,
        category: 'Family package',
        price: 15000,
        destination: 'Venice',
        description: 'includes hotel reservation,city tour with kids, museum visit, gondola tour',
        title: 'card 0',
        image: "family.jpg",
      },
      {
        title: 'card 1', category: 'Couple package', price: 10000, destination: 'Bali', description: 'includes hotel reservation,city tour, museum visit, gondola tour',
        index: 1, image: "honeymoonpackage.jpg",
      },
      {
        title: 'card 2', category: 'Buddies package', price: 10000, destination: 'Mikonos', description: 'includes hotel reservation(breakfast, lunch, diner),Yacht tour off the coast of greece,musical perfomance from local artist',
        index: 2, image: "friends.jpeg"
      },
      {
        title: 'card 3', category: 'Senior package', price: 10000, destination: 'Kenya', description: ' includes hotel reservation(breakfast, lunch, diner),safari experience,musical perfomance from local artists,visit museums',
        index: 3, image: "safari.jpg"
      }
  ];
   

  selectedPackage: any[] = [];


  dropPackage(card: any): void {
    const index = this.selectedPackage.indexOf(card);
    if (index !== -1) {
      this.selectedPackage.splice(index, 1);
      console.log('Dropped:', card);
      console.log('Current selected packages:', this.selectedPackage);
    }

  }

  selectPackage(cardData: any): void {
    if (!this.selectedPackage.includes(cardData)) {
      this.selectedPackage.push(cardData);
      console.log('Selected:', cardData);
      console.log('Current selected packages:', this.selectedPackage);
    }

    this.packageService.newpackage(cardData).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Package selected!';
        this.selectedPackage = []; // Reset selected packages if needed
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error selecting package:', err);
      }
    });
  }
  card(cardData: any) {
    throw new Error('Method not implemented.');
  }

/*
  dropPackage(card: any): void {
    if (!this.selectedPackage.includes(card)) {
      this.selectedPackage.slice(card);
      console.log('Selected:', card);
      console.log('Current selected packages:', this.selectedPackage);
    }

    this.packageService.newpackage(this.cards[0]).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Package selected!';
        this.selectedPackage = []; // Reset selected packages if needed
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error selecting package:', err);
      }
    });
  }
  card(card: any) {
    throw new Error('Method not implemented.');
  }*/


    
   




  


      
}
