import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "src/app/Services/Authentication/authentication.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  submitted: boolean | undefined;
  abc: any;
  tokendata: any;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthenticationService,
    public router: Router,
    private toastr: ToastrService
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
    this.registerForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirm_password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  password(event: any, value: string) {
    const password = this.registerForm.get("password");
    const confirm_password = this.registerForm.get("confirm_password");
    if (value === "Pass" && event === confirm_password?.value) {
      this.abc = "";
    } else if (value === "Conf" && event === password?.value) {
      this.abc = "";
    } else {
      this.abc = "Password not matched";
    }
  }
  // Function to register the user by sending whole form
  registerUser() {
    console.log(this.registerForm);
    console.log(this.registerForm.value);

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log("Erroneous");
      this.toastr.error("Can not Registered", "Error", {
        timeOut: 5000,
      });
      return;
    }

    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe(
      (data) => {
        const token = data.token;
        console.log(token);
        
        console.log("signup data: ", data.success);
        const msg = data.message;

        if (!data.success) {
          this.toastr.error(data.status, "Error", {
            timeOut: 5000,
          });
          return;
        }
        
        this.authService.setToken(token);
        // if (data.success) {
        this.toastr.success(msg, "Success", {
          timeOut: 5000,
        });

        this.router.navigateByUrl("/agents");
        // }
      },
      (error) => {
        console.log(error.error.status);
        this.toastr.error(error.error.status, "Error", {
          timeOut: 5000,
        });
      }
    );
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
}
