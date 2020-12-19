import { Routes } from "@angular/router";
import { LoginComponent } from "./component/AuthComponent/login/login.component";
import { SignupComponent } from "./component/AuthComponent/signup/signup.component";
import { HomeComponent } from "./component/maincomponent/home/home.component";
import { MainComponent } from "./component/maincomponent/main/main.component";
import { IsLoginGuard } from "../app/Services/Guards/islogin.guard";
import { RedirectLoginGuard } from "../app/Services/Guards/redirectlogin.guard";

import { FullComponent } from "./layouts/full/full.component";
import { UserProfileComponent } from "./component/user-profile/user-profile.component";

export const Approutes: Routes = [
  {
    path: "",
    component: FullComponent,
    children: [
      {
        path: "",
        // canActivate: [IsLoginGuard],
        redirectTo: "/dashboard",
        pathMatch: "full",
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "component",
        loadChildren: () =>
          import("./component/component.module").then(
            (m) => m.ComponentsModule
          ),
      },
      { path: "Main", component: MainComponent },
      { path: "Home", component: HomeComponent },
      { path: "Profile", component: UserProfileComponent },
      {
        path: "Login",
        // canActivate: [RedirectLoginGuard],
        component: LoginComponent,
      },
      {
        path: "Signup",
        // canActivate: [IsLoginGuard],
        component: SignupComponent,
      },
    ],
  },
  {
    path: "**",
    redirectTo: "/dashboard",
  },
];
