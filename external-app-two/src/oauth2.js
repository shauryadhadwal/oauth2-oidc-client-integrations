const clientOAuth2 = require('client-oauth2')

const PORT = 5002

// Implicit Flow
export const generateRandomString = () => {
  var array = new Uint32Array(28);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

export const oauth2Client = new clientOAuth2({
  clientId: 'external-app-two',
  authorizationUri: 'http://127.0.0.1:4444/oauth2/auth',
  redirectUri: `http://127.0.0.1:${PORT}/callback`,
  scopes: ['openid']
})

export const generateStateAndSave = () => {
  const state = generateRandomString()
  localStorage.setItem('ephemeral_state', state)
  return state
}

export const getSavedState = () => {
  return localStorage.getItem('ephemeral_state')
}

