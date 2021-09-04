import { generateRandomString, generateStateAndSave, oauth2Client } from '../oauth2'

function Page() {

  // Very Important
  // Require state as well as nonce for requesting an id_token
  const onLoginClick = () => {
    const uri = oauth2Client.token.getUri({
      query: {
        response_type: 'token id_token',
        state: generateStateAndSave(),
        nonce: generateRandomString(),
      },
    })
    console.info(uri)
    window.location = uri
  }

  return (
    <div className="container mt-2">
      <h1>Welcome to the landing page of external-app-two</h1>
      <button className="btn btn-info mt-5" onClick={onLoginClick}>
        Login
      </button>
      <p>You will be redirected to another site if not logged in already</p>
    </div>
  )
}

export default Page
