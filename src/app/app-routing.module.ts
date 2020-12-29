import { Routes } from "@angular/router";
import { LoginComponent } from "./component/AuthComponent/login/login.component";
import { SignupComponent } from "./component/AuthComponent/signup/signup.component";
import { HomeComponent } from "./component/maincomponent/home/home.component";
import { MainComponent } from "./component/maincomponent/main/main.component";
import { IsLoginGuard } from "../app/Services/Guards/islogin.guard";
import { RedirectLoginGuard } from "../app/Services/Guards/redirectlogin.guard";
import { FullComponent } from "./layouts/full/full.component";
import { UserProfileComponent } from "./component/user-profile/user-profile.component";
import { VisualizationComponent } from "./component/maincomponent/visualization/visualization.component";
import { InventoryComponent } from "./component/inventory/inventory.component";
import { AddInventoryComponent } from "./component/inventory/add-inventory/add-inventory.component";
import { AddAgentsComponent } from "./component/agent/add-agents/add-agents.component";
import { AgentComponent } from "./component/agent/agent.component";

export const Approutes: Routes = [
  {
    path: "",
    component: FullComponent,
    children: [
      {
        path: "",
        canActivate: [IsLoginGuard],
        redirectTo: "/Home",
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
      { path: "Main", canActivate: [IsLoginGuard], component: MainComponent },
      {
        path: "Visualization",
        canActivate: [IsLoginGuard],
        component: VisualizationComponent,
      },
      { path: "Home", component: HomeComponent },
      {
        path: "Profile",
        canActivate: [IsLoginGuard],
        component: UserProfileComponent,
      },
      {
        path: "agent",
        canActivate: [IsLoginGuard],
        children: [
          {
            path: "",
            component: AgentComponent,
            data: {
              title: "Unprocessed Data File",
            },
          },
          {
            path: "add-agent",
            component: AddAgentsComponent,
            data: {
              title: "Add Agent",
            },
          },
        ],
      },
      {
        path: "inventory",
        canActivate: [IsLoginGuard],
        children: [
          {
            path: "",
            component: InventoryComponent,
            data: {
              title: "Processed File Data",
            },
          },
          {
            path: "add-inventory",
            canActivate: [IsLoginGuard],
            component: AddInventoryComponent,
            data: {
              title: "Add Inventory",
            },
          },
        ],
      },
    ],
  },
  {
    path: "Login",
    canActivate: [RedirectLoginGuard],
    component: LoginComponent,
  },
  {
    path: "Signup",
    canActivate: [RedirectLoginGuard],
    component: SignupComponent,
  },

  {
    path: "**",
    redirectTo: "/Home",
  },
];
