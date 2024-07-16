import { Image, StyleSheet, Text, TextInput, View , TouchableOpacity} from 'react-native'
import React from 'react'
import { icons } from '../constants'

const SearchInput = () => {
  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
     <TextInput 
       className="text-base mt-0.5 text-white flex-1 font-pregular"
       placeholder='Searcj a Video topic' 
       placeholderTextColor="#CDCDE0"
       onChangeText={""}
      />

      <TouchableOpacity onPress={""}>
          <Image source={icons.search} className="w-5 h-5" resizeMode='contain'/>
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput

const styles = StyleSheet.create({})