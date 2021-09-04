import { useHistory, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { oauth2Client, options, saveAccessToken, saveIdToken, saveRefreshToken } from '../oauth2'
import { getSavedPKCEVerifier } from '../pkce'

function Page() {
  const history = useHistory()
  const [accessToken, setAccessToken] = useState('')
  const [idToken, setIdToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const search = useLocation().search

  useEffect(() => {
    const verifier = getSavedPKCEVerifier()
    const code = new URLSearchParams(search).get('code')
    const data = {
      client_id: options.clientId,
      redirect_uri: options.redirectUri,
      code: code,
      code_verifier: verifier,
      grant_type: 'authorization_code',
    }
    const body = Object.keys(data)
      .map((key) => `${key}=${encodeURIComponent(data[key])}`)
      .join('&')

    const url = options.accessTokenUri

    oauth2Client.code
      .getToken(window.location.href, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      })
      .then((data) => {
        setAccessToken(data.accessToken)
        setIdToken(data.data.id_token)
        setRefreshToken(data.refreshToken)
        saveAccessToken(data.accessToken)
        saveRefreshToken(data.refreshToken)
        saveIdToken(data.data.id_token)
      })

    // Using Fetch -------------------------------------------------------
    // fetch(url, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: body, // Don't stringify
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data)
    //   })
    // -------------------------------------------------------------------
  }, [])

  const onHomePageClick = () => {
    history.push('/home')
  }

  return (
    <div className="container mt-2">
      <h1>Callback Page</h1>
      <div className="mt-2">Access Token - {accessToken}</div>
      <div className="mt-2">Id Token - {idToken}</div>
      <div className="mt-2">Refresh Token - {refreshToken}</div>
      <button className="btn btn-info mt-5" onClick={onHomePageClick}>
        Go to Home Page
      </button>
    </div>
  )
}

export default Page
