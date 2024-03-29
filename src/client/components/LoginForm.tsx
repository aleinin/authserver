import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core'
import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import styled from 'styled-components'
import { isPopulatedString } from '../../util/is-populated-string'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

interface AuthorizationRequest {
  username: string
  password: string
  client_id: string
  redirect_uri: string
  response_type: 'code'
  scope: string
  state: string
}

export interface LoginState {
  username: string
  password: string
  remember: boolean
}

const loginInitialState: LoginState = {
  username: '',
  password: '',
  remember: false,
}

export const LoginForm = () => {
  const params = new URLSearchParams(window.location.search)
  const [login, setLogin] = useState<LoginState>(loginInitialState)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    console.log(login)
    // todo url
    axios
      .post('http://localhost:3001/authorize/login', {
        username: login.username,
        password: login.password,
        client_id: params.get('client_id'),
        redirect_uri: params.get('redirect_uri'),
        response_type: 'code',
        scope: params.get('scope'),
        state: params.get('state'),
      })
      .then((response: any) => {
        window.location.href = `${params.get('redirect_uri')}?code=${
          response.data.data
        }`
      })
  }
  const handleChange = (event: any) => {
    const id = event.target.id
    const value = id === 'remember' ? event.target.checked : event.target.value
    setLogin({
      ...login,
      [id]: value,
    })
  }
  const valid =
    isPopulatedString(login.username) && isPopulatedString(login.password)
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <TextField
          style={{ marginBottom: '20px' }}
          id="username"
          label="Username"
          variant="outlined"
          value={login.username}
          onChange={handleChange}
        />
        <TextField
          style={{ marginBottom: '10px' }}
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={login.password}
          onChange={handleChange}
        />
        <FormControlLabel
          style={{ marginBottom: '15px' }}
          control={
            <Checkbox
              id="remember"
              name="remember"
              color="primary"
              checked={login.remember}
              onChange={handleChange}
            />
          }
          label="Remember me"
        />
        <Button
          disabled={!valid}
          type="submit"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </Form>
    </>
  )
}
