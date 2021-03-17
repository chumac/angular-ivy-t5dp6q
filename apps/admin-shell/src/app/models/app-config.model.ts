
export interface IAppConfig {
  env: {
    name: string;
  };

  authUri: {
    redirectUri: string;
    postLogoutRedirectUri: string;
    resourceUri: string;
  };

  data: {
    api: string;
  };

  appInsights: {
    instrumentationKey: string;
  };

  logging: {
    console: boolean;
    appInsights: boolean;
  };
}
