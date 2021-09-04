import { oauth2Client } from '../oauth2'

function Page() {
  const onLoginClick = () => {
    const uri = oauth2Client.token.getUri({query: {
      response_type: 'token' //TODO: id_token not returned
    }})
    console.log(uri)
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
