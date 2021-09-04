const clientOAuth2 = require('client-oauth2')

const PORT = 5002

// Implicit Flow
const oauth2Client = new clientOAuth2({
  clientId: 'external-app-two',
  authorizationUri: 'http://127.0.0.1:4444/oauth2/auth',
  redirectUri: `http://127.0.0.1:${PORT}/callback`,
  scopes: ['openid offline_access'],
  state: 'randomly-generated-everytime'
})

export { oauth2Client }
