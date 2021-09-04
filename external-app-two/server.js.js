const clientOAuth2 = require('client-oauth2')
const dotenv = require('dotenv')
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
dotenv.config()
const path = require('path')
const PORT = 5002
const APP_NAME = process.env.APP_NAME || 'external-app-two'

/**
 *  Only works with
 *  "token_endpoint_auth_method": "client_secret_basic"
 * */

app.use(express.static(path.join('frontent', 'public')))

const oauth2Client = new clientOAuth2({
  clientId: APP_NAME,
  accessTokenUri: 'http://127.0.0.1:4444/oauth2/token',
  authorizationUri: 'http://127.0.0.1:4444/oauth2/auth',
  redirectUri: `http://127.0.0.1:${PORT}/callback`,
  scopes: ['openid offline'],
  state: 'randomly-generated-everytime',
  response_type: 'id_token token',
})

const defaultTokenOpts = () => ({
  secure: true,
  path: '/',
  domain: '127.0.0.1',
  sameSite: 'Lax',
})

app.use(cookieParser())

app.get('/api', (req, res) => {
  res.json({ success: true })
})

app.listen(PORT, () => {
  console.log(`Listening on http://127.0.0.1:${PORT}`)
})
