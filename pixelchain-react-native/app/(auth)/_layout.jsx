import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name='sign-in'
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen 
          name='sign-up'
          options={{
            headerShown: false,
          }}
        />

        <StatusBar backgroundColor='#161622' style='light'/>
      </Stack>
    </>
  )
}

export default AuthLayout

