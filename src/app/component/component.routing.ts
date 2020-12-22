import { AddInventoryComponent } from './inventory/add-inventory/add-inventory.component';
import { AddLeadsComponent } from './leads/add-leads/add-leads.component';
import { AddAgentsComponent } from './agent/add-agents/add-agents.component';
import { LeadsComponent } from './leads/leads.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AgentComponent } from './agent/agent.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { Routes } from '@angular/router';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
		
      {
        path: 'profile',
				component: UserProfileComponent,
				data: {
					title: 'Profile',
				}
      },
      {
        path: 'agent',
        children: [
          {
            path: '',
            component: AgentComponent,
            data: {
              title: 'Agents',
            }
          },
          {
            path: 'add-agent',
            component: AddAgentsComponent,
            data: {
              title: 'Add Agent',
            }
          }
        ],
      },
      {
        path: 'inventory',
        children: [
          {
            path: '',
            component: InventoryComponent,
            data: {
              title: 'Inventory Management',
            }
          },
          {
            path: 'add-inventory',
            component: AddInventoryComponent,
            data: {
              title: 'Add Inventory',
            }
          }
        ]
      },
      {
        path: 'leads',
        children: [
          {
            path: '',
            component: LeadsComponent,
            data: {
              title: 'Leads Management',
            }
          },
          {
            path: 'add-lead',
            component: AddLeadsComponent,
            data: {
              title: 'Add Lead',
            }
          }
        ]
      }
		]
	}
];
