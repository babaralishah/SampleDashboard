import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/AuthComponent/login/login.component';
import { SignupComponent } from './component/AuthComponent/signup/signup.component';
import { HomeComponent } from './component/maincomponent/home/home.component';
import { MainComponent } from './component/maincomponent/main/main.component';

import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      { path: 'Main', component: MainComponent },
      { path: 'Home', component: HomeComponent },
      { path: 'Login', component: LoginComponent },
      { path: 'Signup', component: SignupComponent }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
