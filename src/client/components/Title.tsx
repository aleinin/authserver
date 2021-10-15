import React from 'react'
import styled from 'styled-components'

const Text = styled.span`
  font-size: 2.5em;
  text-align: left;
  padding-bottom: 15px;
  border-bottom: 1px solid black;
  margin-bottom: 30px;
  font-family: 'Raleway', sans-serif;
`
export const Title = ({ title }: { title: string }) => <Text>{title}</Text>
