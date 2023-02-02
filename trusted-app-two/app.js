const clientOAuth2 = require('client-oauth2')
const dotenv = require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const path = require('path')
const axios = require('axios')
const qs = require('querystring')
const cors = require('cors')
const PORT = process.env.PORT || 4002
const APP_NAME = process.env.APP_NAME || 'trusted-app-two'
const HYDRA_ADMIN_URL = process.env.HYDRA_ADMIN_URL || 'http://127.0.0.1:4445'

app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(cors())
app.use(cookieParser())

// Validate token
const routeGuard = (req, res, next) => {
  let accessToken = undefined

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    accessToken = req.headers.authorization.split(' ')[1]
  }

  if (!accessToken) {
    return res.status(400).json({ message: 'Access Token Missing.' })
  }

  const body = qs.stringify({ token: accessToken }) //token is the accepted property name
  
  return axios
    .post(`${HYDRA_ADMIN_URL}/oauth2/introspect`, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((result) => {
      if (!result.data.active) {
        return res.status(401).json({ message: 'Access Token is invalid or must have expired.' })
      }
      next()
    })
    .catch((err) => {
      next(new Error('An error occurred in route guard'))
    })
}

app.get('/', (req, res, next) => {
  res.render('landing-page.html', {
    subject: APP_NAME,
  })
})

app.get('/api/users', routeGuard, (req, res, next) => {
  res.json({ data: ['Avani Lekhara', 'Bhavina Patel', 'Nishad Kumar'] })
})

app.get('/api/cities', (req, res, next) => {
  res.json({ data: ['Jaipur', 'Sundhiya', 'Amb'] })
})

app.get('/api/mock-unauthorized-access', (req, res, next) => {
  res.status(401).json({message: 'Access token is invalid or expired'})
})

app.use((err, req, res, next) => {
  if (!err.message) {
    err.message = 'System Error'
  }
  return res.json({ message: err.message })
})

app.listen(PORT, () => {
  console.log(`Listening on http://127.0.0.1:${PORT}`)
})
