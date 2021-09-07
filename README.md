## OAuth2.0 & OIDC integrations with clients using different grant flows
Will be using Ory Hydra as an Identity and Authorization server to mimic IdP service. You can feel free to use okta or AuthO etc. as well.

### Authorization Code Grant Flow
***external-app-one*** A server side node express application demonstrating [authorization code grant flow](https://developer.okta.com/blog/2018/04/10/oauth-authorization-code-grant-type)

### Implicit Grant Flow

***external-app-two*** A node express backend with a react frontend demonstrating [implicit flow grant](https://developer.okta.com/blog/2018/05/24/what-is-the-oauth2-implicit-grant-type)

### Authorization Code Grant Flow with PKCE

***external-app-three*** A React.js App demonstrating [Auth Code with PKCE](https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce)

### Auto refresh tokens when 401 response status

***external-app-four*** A React.js App demonstrating [Auth Code with PKCE](https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce). 
Using axios library to catch 401 response code in interceptors and initiating a refresh token request.


### Resources

[/authorize Endpoint](https://auth0.com/docs/authorization/protocols/protocol-oauth2#authorization-endpoint)

[Which Auth Grant Flow to use?](https://auth0.com/docs/authorization/flows/which-oauth-2-0-flow-should-i-use#can-i-try-the-endpoints-before-i-implement-my-application-)
