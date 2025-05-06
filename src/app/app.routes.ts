import { Routes } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { FooterComponent } from './component/footer/footer.component';
import { PackagesComponent } from './component/packages/packages.component';
import { FAQsComponent } from './component/faqs/faqs.component';
import { ServiceComponent } from './component/service/service.component';
import { TermsoftermsComponent } from './component/termsofterms/termsofterms.component';
import { RegistrationComponent } from './registration/registration.component';
import { BodyComponent } from './component/body/body.component';
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component:HomeComponent},
    { path: 'packages', component: PackagesComponent },
    {path: 'faqs', component: FAQsComponent},
    {path: 'service', component:ServiceComponent},
    {path: 'Termsofterms', component:TermsoftermsComponent},
    {path: 'register', component: BodyComponent},
    {path: 'Start Planning Tours', component:HeaderComponent}
];
