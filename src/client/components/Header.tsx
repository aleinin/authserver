import React from 'react'
import styled from 'styled-components'

const HeaderStyle = styled.div`
  width: 100%;
  background-color: rgba(10, 10, 10, 0.9);
  height: 50px;
`

const Text = styled.span`
  color: white;
  margin-left: 10px;
  font-size: 2em;
`

export const Header = () => (
  <HeaderStyle>
    <Text>aleinin.com</Text>
  </HeaderStyle>
)
