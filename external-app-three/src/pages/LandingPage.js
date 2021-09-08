import { generateStateAndSave, oauth2Client } from '../oauth2'
import { generateVerifierChallengeSetAndSave } from '../pkce'

function Page() {
  const onLoginClick = async () => {
    const state = generateStateAndSave()
    const code_challenge = await generateVerifierChallengeSetAndSave()
    setTimeout(() => {
      window.location = oauth2Client.code.getUri({
        query: {
          state: state,
          code_challenge: code_challenge,
          code_challenge_method: 'S256',
          audience: 'https://localhost:4001 https://127.0.0.1:4001',
        },
      })
    }, 0)
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
