import { generateStateAndSave, oauth2Client } from '../oauth2'
import { generateVerifierChallengeSetAndSave } from '../pkce'

function Page() {
  const onLoginClick = async () => {
    window.location = oauth2Client.code.getUri({
      query: {
        state: generateStateAndSave(),
        code_challenge: await generateVerifierChallengeSetAndSave(),
        code_challenge_method: 'S256',
      },
    })
  }

  return (
    <div className="container mt-2">
      <h1>Welcome to the landing page of external-app-three</h1>
      <button className="btn btn-info mt-5" onClick={onLoginClick}>
        Login
      </button>
      <p>You will be redirected to another site if not logged in already</p>
    </div>
  )
}

export default Page
