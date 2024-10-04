import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { images } from '../constants'
import CustomButton from "./CustomButton"

const EmptyState = ({title,subtitle, btn }) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-base font-pmedium text-[#FFB37C]">{title}</Text>
      <Text className="text-xs text-center font-psemibold text-gray-200 mt-2">
        {subtitle}
      </Text>

      {btn && (
        <CustomButton
          title="Back to Explore"
          handlePress={""}
          containerStyles="w-full my-5"
        />
      )}
    </View>
  );
}

export default EmptyState

const styles = StyleSheet.create({})