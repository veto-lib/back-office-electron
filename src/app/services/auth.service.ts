import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService) { }

  async start() {
    this.oauthService.configure({
      issuer: environment.auth.issuer,
      redirectUri: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: environment.auth.clientId,
      scope: environment.auth.scope,
      skipIssuerCheck: true,
      strictDiscoveryDocumentValidation: false
    });
    return this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(): void {
    this.oauthService.initLoginFlow();
  }

  logout(): void {
    this.oauthService.logOut();
  }

  get token(): string | null {
    return this.oauthService.hasValidAccessToken()
      ? this.oauthService.getAccessToken()
      : null;
  }

  get name(): string {
    const claims = this.oauthService.getIdentityClaims() as any;
    return claims?.name;
  }

  get email(): string {
    const claims = this.oauthService.getIdentityClaims() as any;
    return claims?.preferred_username;
  }

  get isLoggedIn(): boolean {
    return this.oauthService.getIdentityClaims() !== null;
  }

}
