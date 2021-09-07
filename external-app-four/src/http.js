import axios from 'axios'
import { getSavedRefreshToken, options, saveAccessToken, saveIdToken, saveRefreshToken } from './oauth2'
import qs from 'querystring'

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      return axios
        .post(
          options.accessTokenUri,
          qs.stringify({
            refresh_token: getSavedRefreshToken(),
            client_id: options.clientId,
            grant_type: 'refresh_token',
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            alert('Returned new tokens')            
            saveAccessToken(res.data.access_token)
            saveRefreshToken(res.data.refresh_token)
            saveIdToken(res.data.id_token)

            // Since the original request was to an endpoint which always returns 401, we will change the endpoint
            // which validates access tokens before sending response
            originalRequest.url = 'http://127.0.0.1:4001/api/users'
            // Update the original request with new access token
            originalRequest.headers['Authorization'] = 'Bearer ' + res.data.access_token
            
            return axios(originalRequest)
          }
        })
        .catch((err) => {
          console.error(err)
          alert('Could not fetch fresh tokens. Kindly re-authenticate.')
          // Could redirect to login page
        })
    }
    return Promise.reject(error)
  },
)

export default axios
