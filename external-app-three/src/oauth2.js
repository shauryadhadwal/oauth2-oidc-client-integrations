const clientOAuth2 = require('client-oauth2')

export const options = {
  clientId: 'external-app-three',
  accessTokenUri: 'http://127.0.0.1:4444/oauth2/token',
  authorizationUri: 'http://127.0.0.1:4444/oauth2/auth',
  redirectUri: `http://127.0.0.1:5003/callback`,
  scopes: ['openid offline']
}

// Implicit Flow
export const generateRandomString = () => {
  var array = new Uint32Array(28);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

export const oauth2Client = new clientOAuth2(options)

export const generateStateAndSave = () => {
  const state = generateRandomString()
  sessionStorage.setItem('ephemeral_state', state)
  return state
}

export const getSavedState = () => {
  return sessionStorage.getItem('ephemeral_state')
}

export const saveAccessToken = (token) => {
  sessionStorage.setItem('access_token', token)
}

export const getSavedAccessToken = () => sessionStorage.getItem('access_token')

export const saveRefreshToken = (token) => {
  sessionStorage.setItem('refresh_token', token)
}

export const getSavedRefreshToken = () => sessionStorage.getItem('refresh_token')

export const saveIdToken = (token) => {
  sessionStorage.setItem('id_token', token)
}

export const getSavedIdToken = () => sessionStorage.getItem('id_token')


