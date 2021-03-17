import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseLayoutComponent } from './base-layout/base-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'self-service', pathMatch: 'full' },
  // { path: 'signin', component: auth.SigninComponent },
  // { path: 'authorization', component: auth.AuthorizationComponent },
  {
    path: 'self-service',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        loadChildren:
          '@nutela/feature-modules/self-service#FeatureModulesSelfServiceModule'
        // canActivate: [ auth.RouteGuardService ]
      }
    ]
  },
  { path: '**', redirectTo: 'self-service' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
