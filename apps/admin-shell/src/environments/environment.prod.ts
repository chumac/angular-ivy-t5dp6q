import * as constants from '@nutela/shared/app-global';

export const environment = {
  production: true,
  appName: constants.APP.name,
  appShortName: constants.APP.shortName,
  version: "2.1.1206",
  apiAccess: {
    coreDataApi: constants.API_PRODUCTION.dataEndpoint
  },
  appIdUri: constants.SIGNIN_COORDINATES_PRODUCTION.appIdUri,
  signinCoordinates: {
    tenant: constants.SIGNIN_COORDINATES_PRODUCTION.tenant,
    instance: constants.SIGNIN_COORDINATES_PRODUCTION.instance,
    clientId: constants.SIGNIN_COORDINATES_PRODUCTION.clientId,
    redirectUri: constants.SIGNIN_COORDINATES_PRODUCTION.redirectUri,
    postLogoutRedirectUri:
      constants.SIGNIN_COORDINATES_PRODUCTION.postLogoutRedirectUri,
    endpoints: {
      'https://globalapi.xceed365.com':
        constants.SIGNIN_COORDINATES_PRODUCTION.appIdUri
    }
  }
};


// https://apistaging.xceed365.com

// https://apidevelopment.xceed365.com
