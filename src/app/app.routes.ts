import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { About } from './features/about/about';
import { Team } from './features/team/team';
import { Contact } from './features/contact/contact';

export const routes: Routes = [
  { path: '', component: Home, title: 'FASS Services - Industry Software for Emerging Markets' },
  { path: 'about', component: About, title: 'FASS Services - About Us' },
  { path: 'products', loadComponent: () => import('./features/products/products').then(m => m.Products), title: 'FASS Services - Products' },
  { path: 'products/:slug', loadComponent: () => import('./features/products/product-detail').then(m => m.ProductDetail), title: 'FASS Services - Product' },
  { path: 'industries', loadComponent: () => import('./features/industries/industries').then(m => m.Industries), title: 'FASS Services - Industries' },
  { path: 'team', component: Team, title: 'FASS Services - Team' },
  { path: 'contact', component: Contact, title: 'FASS Services - Contact' },
  { path: 'initiatives', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
