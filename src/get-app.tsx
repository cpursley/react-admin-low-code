import React from 'react'
import buildHasuraProvider from 'ra-data-hasura-graphql';
import App from './App'

const uri = "https://low-code-api.herokuapp.com/v1/graphql";

export default async function getApp() {
  const provider: Function = await buildHasuraProvider({ clientOptions: { uri: uri }})
  return () => (
    <App dataProvider={provider} />
  )
}