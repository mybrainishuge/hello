import { provideRouter, RouterConfig } from '@angular/router';
import { AppComponent, environment } from './';
import { WelcomeComponent } from './welcome/';
import { DashboardComponent } from './dashboard/';
import { HomeComponent } from './dashboard/home';
import { LearnComponent } from './dashboard/learn';
import { ConnectComponent } from './dashboard/connect';
import { CreateComponent } from './dashboard/create';

export const routes: RouterConfig = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'learn', component: LearnComponent },
      { path: 'connect', component: ConnectComponent },
      { path: 'create', component: CreateComponent }
    ] },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
