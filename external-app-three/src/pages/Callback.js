import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { oauth2Client } from '../oauth2'

function Page() {
  const history = useHistory()
  const [accessToken, setAccessToken] = useState('');
  

  useEffect(() => {
    oauth2Client.token.getToken(window.location.href).then(data => {
      console.log(data)
      setAccessToken(data.accessToken)
    })
  }, [])

  const onHomePageClick = () => {
    history.push('/home')
  }

  return (
    <div className="container mt-2">
      <h1>Callback Page</h1>
      <div className="mt-2">
      Access Token - {accessToken}
      </div>
      <button className="btn btn-info mt-5" onClick={onHomePageClick}>
        Go to Home Page
      </button>
    </div>
  )
}

export default Page
