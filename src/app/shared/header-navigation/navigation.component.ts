import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from "src/app/Services/Authentication/authentication.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
//declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  @Output()
  toggleSidebar = new EventEmitter<void>();

  public showSearch = false;

  constructor(public authService: AuthenticationService,
    private toastr: ToastrService,
    public router: Router,) {}
  
  isLogin() {
// console.log('dasd');

    const token = this.authService.getToken();
    return token;
  }
  logout() {
    // console.log('dasd');
    
    localStorage.removeItem('token');
    this.toastr.success('Logged Out', 'Success', {
      timeOut: 5000
    });
    console.log('\nlogout\n');
    this.router.navigateByUrl('/Login');
  }
}
