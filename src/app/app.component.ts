import { Component,AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { BodyComponent } from './component/body/body.component';
import { FAQsComponent } from './component/faqs/faqs.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { RouterOutlet } from '@angular/router';
import { ServiceComponent } from './component/service/service.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule ,RouterOutlet,BodyComponent,RouterModule, HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentRoute: string = '';
  data: any;
  constructor(private router: Router) {}

  
  

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {  // ✅ Ensure it's a route change event
        this.currentRoute = event.url.split('?')[0].split('#')[0]; // ✅ Remove query params & hash fragments
      }
    });
  }
 
  
  title = 'myAPP';
};
