import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AccountInfoLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name='accountinfo'
          options={{
            headerShown: false,
          }}
        />


        <StatusBar backgroundColor='#161622' style='light'/>
      </Stack>
    </>
  )
}

export default AccountInfoLayout