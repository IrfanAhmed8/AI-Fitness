export const authConfig= {
  clientId: 'Outh2-PKCE-Client',
  authorizationEndpoint: 'http://localhost:8181/realms/AI-Fitness/protocol/openid-connect/auth',
  tokenEndpoint: 'http://localhost:8181/realms/AI-Fitness/protocol/openid-connect/token',
  redirectUri: 'http://localhost:5173',
  scope: 'openid profile email offline_access',
  onRefreshTokenExpire: (event) => event.logIn(),
}