import { useHistory } from 'react-router-dom'

function Page() {
  const history = useHistory()

  const onLandingPageClick = () => {
    history.push('/')
  }

  const onLogoutClick = () => {
    const idToken = ''
    const accessToken = ''
    const postLogoutUri = `http://127.0.0.1:5002}`
    const uri = `http://127.0.0.1:4444/oauth2/sessions/logout?post_logout_redirect_uri=${postLogoutUri}&id_token_hint=${idToken}`
  }

  return (
    <div className="container mt-2">
      <h1>Welcome to the Home Page of external-app-two</h1>
      <button className="btn btn-info mt-5" onClick={onLandingPageClick}>
        Go to Landing Page
      </button>
      <br />
      <button className="btn btn-info mt-1" onClick={onLogoutClick}>
        Logout
      </button>
    </div>
  )
}

export default Page
