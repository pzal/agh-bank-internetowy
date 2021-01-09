import axios from 'axios'
import {useAsync} from 'react-async'

import {getApiKeyFromCookie} from './cookies'

const _apiGet = async ({url, ...args}: any) => {
  const headers: any = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  const token = getApiKeyFromCookie()
  if (token) {
    headers['Authorization'] = `Token ${token}`
  }

  return axios
    .get(url, {
      headers,
    })
    .then(response => response.data)
}

export const apiPost = (url: string, data: any) => {
  const headers: any = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  const token = getApiKeyFromCookie()
  if (token) {
    headers['Authorization'] = `Token ${token}`
  }
  return axios.post(url, data, {
    headers,
  })
}

export const apiPatch = (url: string, data: any) => {
  const headers: any = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  const token = getApiKeyFromCookie()
  if (token) {
    headers['Authorization'] = `Token ${token}`
  }
  return axios.patch(url, data, {
    headers,
  })
}

export const apiDelete = (url: string) => {
  const headers: any = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  const token = getApiKeyFromCookie()
  if (token) {
    headers['Authorization'] = `Token ${token}`
  }
  return axios.delete(url, {
    headers,
  })
}

export const useApiGet = (url: string, deferred = false) => {
  const callParams: any = {}
  if (deferred) {
    const deferFn = () => _apiGet({url})
    callParams['deferFn'] = deferFn
  } else {
    callParams['promiseFn'] = _apiGet
    callParams['url'] = url
  }
  interface RetValue {
    data?: any
    isPending: boolean
    isRejected: boolean
    error?: any
    reload: () => void
    run: () => void
  }
  const {data, isPending, error, isRejected, reload, run}: RetValue = useAsync({
    ...callParams,
  })

  // const jsonData = response.data as {[key: string]: any}

  return {data, error, isPending, isRejected, reload, run}
}
