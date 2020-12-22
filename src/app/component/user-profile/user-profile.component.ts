import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  tokendata: any;
  token: any;

  constructor(
    public formBuilder: FormBuilder, // Creating an instance of Formbuilder
    public authService: AuthenticationService, // Instance of Authentication services created in front end
    public router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tokenization();
  }

  async tokenization() {
    this.token = await this.authService.getToken();
    const decodedToken = await this.authService.getDecodedToken(this.token);
    this.tokendata = decodedToken?.data;
    console.log(this.tokendata);
  }
}
