## OAuth2.0 & OIDC integrations with clients using different grant flows
Will be using Ory Hydra as an Identity and Authorization server to mimic IdP service. You can feel free to use okta or AuthO etc. as well.

> These are just sample applications to help you get started with OAuth2.0 and OIDC quickly.
> Not following any best practices or coding guidelines.

These samples can be used in different contexts:
1. You are building an Identity Provider for you organization(THE COMPANY) using ory hydra (could be others like okta etc.). Think of trusted-apps as your own applications/apis (like Google Services) and external-apps as 3rd party clients who want to use access your apis.
2. Your organization (THE COMPANY) is using the services of an external-app (SAAS, PAAS) and have integrated it into your trusted-app, a user can go to the external-app from your trusted-app without filling his/her credentials again on external-app and start using it straight away thanks to Single Sign On.


### Authorization Code Grant Flow
***external-app-one*** A server side node express application demonstrating [Auth code flow grant](https://developer.okta.com/blog/2018/04/10/oauth-authorization-code-grant-type)
- Confidential 

### Implicit Grant Flow

***external-app-two*** A React.js App demonstrating [Implicit flow grant](https://developer.okta.com/blog/2018/05/24/what-is-the-oauth2-implicit-grant-type)
- Public Client

### Authorization Code Grant Flow with PKCE

***external-app-three*** A React.js App demonstrating [Auth Code with PKCE](https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce)
- Public Client

### Auto refresh tokens when 401 response status

***external-app-four*** A React.js App demonstrating [Auth Code with PKCE](https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce). 
Using axios library to catch 401 response code in interceptors and initiating a refresh token request.
- Public Client
- Same as external-app-three

### Other Projects

***trusted-app-one*** An API server to emulate a Resource Server.
Accepts `access_tokens` and validates them at `/introspect` endpoint of Authorization Server


### How to get started?

1. You need docker and docker-compose
2. Run `docker-compose up` in ory-hydra folder
3. Run `npm run build && npm start` in ory-hydra-login-consent-node 
4. Run `npm run start` in trusted-app-one folder
5. Check the npm scripts in any of the external-app folders you want to test
6. For client registration with ory-hydra, register-client.json has been provided in the folders.

### TODOs
1. Front-channel Logout
2. Back-channel Logout

## Resources

[Which Auth Grant Flow to use?](https://auth0.com/docs/authorization/flows/which-oauth-2-0-flow-should-i-use#can-i-try-the-endpoints-before-i-implement-my-application-)
[/token endpoint](https://connect2id.com/products/server/docs/api/token) 
