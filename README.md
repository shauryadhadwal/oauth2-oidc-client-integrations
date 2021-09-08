## OAuth2.0 & OIDC integrations with clients using different grant flows
Will be using Ory Hydra as an Identity and Authorization server to mimic IdP service. You can feel free to use okta or AuthO etc. as well.

> These are just sample applications to help you get started with OAuth2.0 and OIDC quickly.
> Not following any best practices or coding guidelines.
> 
### Authorization Code Grant Flow
***external-app-one*** A server side node express application demonstrating [Auth code flow grant](https://developer.okta.com/blog/2018/04/10/oauth-authorization-code-grant-type)

### Implicit Grant Flow

***external-app-two*** A React.js App demonstrating [Implicit flow grant](https://developer.okta.com/blog/2018/05/24/what-is-the-oauth2-implicit-grant-type)

### Authorization Code Grant Flow with PKCE

***external-app-three*** A React.js App demonstrating [Auth Code with PKCE](https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce)

### Auto refresh tokens when 401 response status

***external-app-four*** A React.js App demonstrating [Auth Code with PKCE](https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce). 
Using axios library to catch 401 response code in interceptors and initiating a refresh token request.

## How to get started?

1. You need docker and docker-compose
2. Run `docker-compose up` in ory-hydra folder
3. Run `npm run start` in trusted-app-one folder
4. Check the npm scripts in any of the external-app folders you want to test

## Resources

[Which Auth Grant Flow to use?](https://auth0.com/docs/authorization/flows/which-oauth-2-0-flow-should-i-use#can-i-try-the-endpoints-before-i-implement-my-application-)
