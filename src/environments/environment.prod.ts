export const environment = {
  production: true,
  api: 'https://veto-lib-back.herokuapp.com',
  auth: {
    tenantId: 'eae410ed-7a7e-451a-b931-636bbc191a74',
    clientId: '6e7ff94f-0d1e-4ac6-af6a-15c5713f28fc',
    scope: 'openid profile email api://veto-lib/all',
    get issuer(): string {
      return `https://sts.windows.net/${this.tenantId}/v2.0`;
    }
  }
};
