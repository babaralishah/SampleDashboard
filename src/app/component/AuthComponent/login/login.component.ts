import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "src/app/Services/Authentication/authentication.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  submitted = false;
  tokendata: any;
  loginForm!: FormGroup;
  email: any;
  errorMessage: any;

  constructor(
    public formBuilder: FormBuilder, // Creating an instance of Formbuilder
    public authService: AuthenticationService, // Instance of Authentication services created in front end
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initialize();
    this.tokenization();
  }
  async tokenization() {
    const token: any = await this.authService.getToken();
    const decodedToken = await this.authService.getDecodedToken(token);
    this.tokendata = decodedToken?.data;
    console.log(this.tokendata);
  }
  initialize() {
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });

    this.route.params.subscribe((param) => {
      this.email = param.email;
    });
  }
  loginUser() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
        console.log("Subscribed Data: ", data);
        const msg = data.message;
        const token = data.token;
        const email = this.loginForm.value.email;
        // this.toastr.success(msg, "Success", {
        //   timeOut: 5000,
        // });
        this.authService.setToken(token);
        this.router.navigate(["/profile", email]);
      },
      (error) => {
        console.error(error.error.message);
        this.errorMessage = error;
        // this.toastr.error(error.error.message, "Error", {
        //   timeOut: 5000,
        // });
      }
    );
  }
  get f() {
    return this.loginForm.controls;
  }
}
