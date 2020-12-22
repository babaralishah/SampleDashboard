import { AddLeadsComponent } from "./leads/add-leads/add-leads.component";
import { LeadsComponent } from "./leads/leads.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { Routes } from "@angular/router";

export const ComponentsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "profile",
        component: UserProfileComponent,
        data: {
          title: "Profile",
        },
      },
      {
        path: "leads",
        children: [
          {
            path: "",
            component: LeadsComponent,
            data: {
              title: "Leads Management",
            },
          },
          {
            path: "add-lead",
            component: AddLeadsComponent,
            data: {
              title: "Add Lead",
            },
          },
        ],
      },
    ],
  },
];
