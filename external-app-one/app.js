const clientOAuth2 = require('client-oauth2')
const dotenv = require('dotenv')
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
dotenv.config()
const path = require('path')
const PORT = 5001
const APP_NAME = process.env.APP_NAME || 'external-app-one'

app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

/**
 * When using Authorization code grant flow,
 * clientOAuth2 Library uses
 * "token_endpoint_auth_method": "client_secret_basic"
 * */
const CLIENT_SECRET = 'RoHxFPJtvvLJoar2whfjOEIvQK'
const oauth2Client = new clientOAuth2({
  clientId: APP_NAME,
  clientSecret: CLIENT_SECRET,
  accessTokenUri: 'http://127.0.0.1:4444/oauth2/token',
  authorizationUri: 'http://127.0.0.1:4444/oauth2/auth',
  redirectUri: `http://127.0.0.1:${PORT}/callback`,
  scopes: ['openid offline'],
  state: 'randomly-generated-everytime',
})

const defaultTokenOpts = () => ({
  secure: true,
  path: '/',
  domain: '127.0.0.1',
  sameSite: 'Lax',
})

app.use(cookieParser())

app.get('/', (req, res) => {
  res.render('landing-page.html', {
    subject: APP_NAME,
  })
})

app.get('/login', (req, res) => {
  const uri = oauth2Client.code.getUri()
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
  const postLogoutUri = `http://127.0.0.1:${PORT}`
  const uri = `http://127.0.0.1:4444/oauth2/sessions/logout?post_logout_redirect_uri=${postLogoutUri}&id_token_hint=${idToken}`
  res.redirect(uri)
})

app.get('/callback', (req, res) => {
  // Received code in req
  console.info(`Received code from auth server: ${req.query.code}`)
  // Now exchange code for tokens
  oauth2Client.code
    .getToken(req.originalUrl, {})
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
