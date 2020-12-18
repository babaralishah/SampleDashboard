import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from '../Authentication/authentication.service';
import { Injectable } from '@angular/core';

import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RedirectLoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {}

  async canActivate() {
    const token = await this.authService.getToken();
    if (token) {
      this.router.navigateByUrl('/profile');
  } else {
      return true;
    }
  }
}
