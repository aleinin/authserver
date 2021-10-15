import React from 'react'
import styled from 'styled-components'

const FooterStyle = styled.div`
  width: 100%;
  background-color: rgba(10, 10, 10, 0.9);
  height: 50px;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Text = styled.span`
  color: rgb(240, 240, 240);
  margin-left: 10px;
  font-size: 0.9em;
  vertical-align: center;
`

export const Footer = () => (
  <FooterStyle>
    <Text>
      Copyright © 2021 aleinin.com | Image by{' '}
      <a href="https://unsplash.com/photos/9XngoIpxcEo">Jr Korpa</a>
    </Text>
  </FooterStyle>
)
