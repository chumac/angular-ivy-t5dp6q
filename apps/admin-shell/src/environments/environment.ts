// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as constants from '@nutela/shared/app-global';
// import { version } from '../../../../';

// import * as npm from '../../../../';

export const environment = {
  production: false,
  appName: constants.APP.name,
  appShortName: constants.APP.shortName,
  version: "2.1.1206",
  apiAccess: {
    coreDataApi: constants.API_DEVELOPMENT.dataEndpoint
  },
  appIdUri: constants.SIGNIN_COORDINATES_DEVELOPMENT.appIdUri,
  signinCoordinates: {
    tenant: constants.SIGNIN_COORDINATES_DEVELOPMENT.tenant,
    instance: constants.SIGNIN_COORDINATES_DEVELOPMENT.instance,
    clientId: constants.SIGNIN_COORDINATES_DEVELOPMENT.clientId,
    redirectUri: constants.SIGNIN_COORDINATES_DEVELOPMENT.redirectUri,
    postLogoutRedirectUri:
      constants.SIGNIN_COORDINATES_DEVELOPMENT.postLogoutRedirectUri,
    endpoints: {
      'apidevelopment.xceed365.com':
        constants.SIGNIN_COORDINATES_DEVELOPMENT.appIdUri
    }
  }
};

// apidevelopment.xceed365.com

// https://apistaging.xceed365.com

// https://globalapi.xceed365.com

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
