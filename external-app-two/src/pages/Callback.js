import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getSavedState, oauth2Client } from '../oauth2'

function Page() {
  const history = useHistory()
  const [accessToken, setAccessToken] = useState('')
  const [idToken, setIdToken] = useState('')

  useEffect(() => {
    const state = getSavedState()
    // Sometimes localStorage is not synchronous, using this to postpone execution to the end
    setTimeout(
      oauth2Client.token
        .getToken(window.location.href, {
          query: {
            state: state,
          },
        })
        .then((data) => {
          console.log(data)
          setAccessToken(data.accessToken)
          setIdToken(data.data.id_token)
        }),
      0,
    )
  }, [])

  const onHomePageClick = () => {
    history.push('/home')
  }

  return (
    <div className="container mt-2">
      <h1>Callback Page</h1>
      <div className="mt-2">Access Token - {accessToken}</div>
      <div className="mt-2">Id Token - {idToken}</div>
      <button className="btn btn-info mt-5" onClick={onHomePageClick}>
        Go to Home Page
      </button>
    </div>
  )
}

export default Page
