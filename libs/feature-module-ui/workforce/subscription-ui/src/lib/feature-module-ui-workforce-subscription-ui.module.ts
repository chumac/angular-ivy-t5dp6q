import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { IgxGridModule } from 'igniteui-angular';
import { DxDateBoxModule } from 'devextreme-angular';
import { DxLookupModule } from 'devextreme-angular/ui/lookup';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { SharedUiModule } from '@nutela/shared/ui';
import { SharedAppGlobalModule } from '@nutela/shared/app-global';

import { RouterModule } from '@angular/router';
import { subscriptionsEffects, subscriptionsReducer } from './store/root';

import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { SubscriptionsEditorComponent } from './components/subscriptions/subscriptions-editor/subscriptions-editor.component';
import { SubscriptionsViewerComponent } from './components/subscriptions/subscriptions-viewer/subscriptions-viewer.component';
import { ThreeWaySwitchComponent } from './com-parts/three-way-switch/three-way-switch.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedUiModule,
    SharedAppGlobalModule,
    MDBBootstrapModulesPro,
    IgxGridModule,
    DxDateBoxModule,
    DxLookupModule,
    CarouselModule,
    StoreModule.forFeature('subscriptions', subscriptionsReducer),
    EffectsModule.forRoot(subscriptionsEffects),
    RouterModule.forChild([
      { path: '', component: SubscriptionsComponent, data: { state: 'benefits' } },
    ])
    ],
  declarations: [ThreeWaySwitchComponent, SubscriptionsComponent, SubscriptionsEditorComponent, SubscriptionsViewerComponent],
  exports: [],
  providers: []
})
export class FeatureModuleUiWorkforceSubscriptionUiModule {}
