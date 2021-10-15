import React from 'react'
import styled from 'styled-components'
import { LoginForm } from './LoginForm'
import { Title } from './Title'

const Card = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #eef0f7;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
  min-width: 232px;
`

export const Login = () => (
  <Card>
    <Title title="Login" />
    <LoginForm />
  </Card>
)
