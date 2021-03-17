import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { throwIfAlreadyLoaded } from './guards/module-import-guard';

import { UtilService } from './services/util.service';
import { BusinessOptionService } from './services/business-option.service';
import { ApiService } from './services/api.service';
import { ExternalLookupService } from './services/external-lookup.service';
import { RouteEventsService } from './services/route-events.service';

@NgModule({
  imports: [CommonModule]
})
export class CoreServicesModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreServicesModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreServicesModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreServicesModule,
      providers: [UtilService, BusinessOptionService, ApiService, ExternalLookupService, RouteEventsService]
    };
  }
}
