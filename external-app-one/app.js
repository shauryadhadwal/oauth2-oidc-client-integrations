const clientOAuth2 = require('client-oauth2')
const dotenv = require('dotenv')
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
dotenv.config()
const path = require('path')
const PORT = 5001
const APP_NAME = process.env.APP_NAME || 'external-app-one'
const BASE_PATH = process.env.BASE_PATH || ''
const AUDIENCE = process.env.AUDIENCE || 'http://localhost:4001 http://127.0.0.1:4001'
const oauthServerApi = process.env.OAUTH_SERVER_API || 'http://127.0.0.1:4444'
const SERVER_HOSTED_URI = process.env.SERVER_HOSTED_URI
const REDIRECT_URI = SERVER_HOSTED_URI ? `${SERVER_HOSTED_URI}${BASE_PATH}/callback` : `http://127.0.0.1:${PORT}/callback`
const POST_LOGOUT_URI = SERVER_HOSTED_URI ? `${SERVER_HOSTED_URI}${BASE_PATH}` : `http://127.0.0.1:${PORT}`

app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
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
  redirectUri: REDIRECT_URI,
  scopes: ['openid offline'],
  state: 'randomly-generated-everytime',
})

const defaultTokenOpts = () => ({
  secure: true,
  path: '/',
  domain: SERVER_HOSTED_URI || '127.0.0.1',
  sameSite: 'Lax',
})

app.use(cookieParser())

app.get('/', (req, res) => {
  res.render('landing-page.html', {
    subject: APP_NAME,
    basePath: BASE_PATH
  })
})

app.get('/login', (req, res) => {
  // Audience is the trusted app one which has default 4001 port
  const uri = oauth2Client.code.getUri({
    query: {
      audience: AUDIENCE,
    }
  })
  res.redirect(uri)
})

/**
 * It is important to send id_token in the logout request
 * to ory hydra so that the login session is revoved from
 * memory
 */
app.get('/logout', (req, res) => {
  const idToken = req.cookies[`${APP_NAME}_id_token`]
  const accessToken = req.cookies[`${APP_NAME}_access_token`]
  const uri = `${oauthServerApi}/oauth2/sessions/logout?post_logout_redirect_uri=${POST_LOGOUT_URI}&id_token_hint=${idToken}`
  res.redirect(uri)
})

app.get('/callback', (req, res) => {
  // Received code in req
  console.info(`Received code from auth server: ${req.query.code}`)
  // Now exchange code for tokens
  console.info(`Original Url: ${req.originalUrl}`)
  oauth2Client.code
    .getToken(`${BASE_PATH}${req.originalUrl}`, {
    })
    .then(function (user) {
      return res
        .cookie(APP_NAME + '_access_token', user.accessToken, defaultTokenOpts())
        .cookie(APP_NAME + '_refresh_token', user.refreshToken, defaultTokenOpts())
        .cookie(APP_NAME + '_id_token', user.data.id_token, defaultTokenOpts())
        .render('callback.html', {
          subject: APP_NAME,
          idToken: user.data.id_token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          port: PORT,
          basePath: BASE_PATH
        })
    })
    .catch(function (error) {
      console.log(error)
    })
})

app.get('/home', (req, res) => {
  res.render('home.html', { subject: APP_NAME })
})

app.listen(PORT, () => {
  console.log(`Listening on http://127.0.0.1:${PORT}`)
})
