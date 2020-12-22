import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AgentComponent } from './agent/agent.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LeadsComponent } from './leads/leads.component';
import { AddAgentsComponent } from './agent/add-agents/add-agents.component';
import { AddLeadsComponent } from './leads/add-leads/add-leads.component';
import { AddInventoryComponent } from './inventory/add-inventory/add-inventory.component';
import { MainComponent } from './maincomponent/main/main.component';
import { HomeComponent } from './maincomponent/home/home.component';
import { LoginComponent } from './AuthComponent/login/login.component';
import { SignupComponent } from './AuthComponent/signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    UserProfileComponent,
    AgentComponent,
    InventoryComponent,
    LeadsComponent,
    AddAgentsComponent,
    AddLeadsComponent,
    AddInventoryComponent,
    MainComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class ComponentsModule {}
