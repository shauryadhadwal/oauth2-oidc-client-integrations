import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getSavedAccessToken, getSavedIdToken, getSavedRefreshToken, oauth2Client, options, saveAccessToken, saveIdToken, saveRefreshToken } from '../oauth2'

function Page() {
  const history = useHistory()

  const [accessToken, setAccessToken] = useState('')
  const [idToken, setIdToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')

  useEffect(() => {
    setAccessToken(getSavedAccessToken())
    setRefreshToken(getSavedRefreshToken())
    setIdToken(getSavedIdToken())
  }, [])

  const onLandingPageClick = () => {
    history.push('/')
  }

  const onLogoutClick = () => {
    const idToken = ''
    const accessToken = ''
    const postLogoutUri = `http://127.0.0.1:5003`
    const uri = `http://127.0.0.1:4444/oauth2/sessions/logout?post_logout_redirect_uri=${postLogoutUri}&id_token_hint=${idToken}`
  }

  const onRefreshClick = () => {
    const data = {
      grant_type: 'refresh_token',
      client_id: options.clientId,
      refresh_token: refreshToken,
    }
    const tokenInstance = oauth2Client.createToken(accessToken, refreshToken)
    tokenInstance
      .refresh({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + accessToken,
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
  }

  return (
    <div className="container mt-2">
      <h1>Welcome to the Home Page of external-app-three</h1>
      <div className="mt-2"></div>
      <button className="btn btn-info mt-5" onClick={onRefreshClick}>
        Refresh Access Token
      </button>
      <br />
      <button className="btn btn-info mt-1" onClick={onLandingPageClick}>
        Go to Landing Page
      </button>
      <br />
      <button className="btn btn-info mt-1" onClick={onLogoutClick}>
        Logout
      </button>
      <div className="mt-2">Access Token - {accessToken}</div>
      <div className="mt-2">Id Token - {idToken}</div>
      <div className="mt-2">Refresh Token - {refreshToken}</div>
    </div>
  )
}

export default Page
