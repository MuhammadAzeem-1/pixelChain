import {  StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'

const bookmark = () => {
  return (
    <SafeAreaView className="bg-gray-50	h-full">
       <Header />

       <Text>lorem</Text>
    </SafeAreaView>
  )
}

export default bookmark

const styles = StyleSheet.create({})