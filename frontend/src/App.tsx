import React, {useState} from 'react'
import axios from 'axios'
import {useAsync} from 'react-async'

const PING_URL = `${process.env.REACT_APP_API_URL}/ping`
const pingAPI = () =>
  axios.get(PING_URL).then(response => {
    return response
  })

function App() {
  const {data: response, isPending} = useAsync({promiseFn: pingAPI})

  return (
    <div>
      <div>this is frontend</div>
      <div>
        test response from <code>{PING_URL}</code><span> : </span>
        <code>{response?.data}</code>{' '}
      </div>
    </div>
  )
}

export default App
