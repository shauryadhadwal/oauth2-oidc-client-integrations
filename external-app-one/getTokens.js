dotenv.config()
const PORT = 5001
const APP_NAME = process.env.APP_NAME || 'external-app-one'
const oauthServerApi = 'https://identity.leadschool.in/public'
/**
 * When using Authorization code grant flow,
 * clientOAuth2 Library uses
 * "token_endpoint_auth_method": "client_secret_basic"
 * */
const CLIENT_SECRET = process.env.CLIENT_SECRET || 'RoHxFPJtvvLJoar2whfjOEIvQK'
const oauth2Client = new clientOAuth2({
  clientId: APP_NAME,
  clientSecret: CLIENT_SECRET,
  accessTokenUri: `${oauthServerApi}/oauth2/token`,
  authorizationUri: `${oauthServerApi}/oauth2/auth`,
  redirectUri: process.env.REDIRECT_URI || `http://127.0.0.1:${PORT}/callback`,
  scopes: ['openid offline'],
  state: 'randomly-generated-everytime',
})

oauth2Client.code
  .getToken(req.originalUrl, {})
  .then(function (user) {
    console.log(user.accessToken)
    console.log(user.refreshToken)
    console.log(user.data.id_token)
  })
  .catch(function (error) {
    console.log(error)
  })
