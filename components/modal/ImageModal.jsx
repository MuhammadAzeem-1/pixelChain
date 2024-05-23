import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ImageModalData } from "../../constants/data";

const renderItem = ({ item }) => (
  <View className="flex flex-row">
    <View>
      <TouchableOpacity className="flex items-center gap-8 mt-1 px-4">
        <Image source={item.image} className="w-6 h-6" resizeMode="contain" />
        <Text className="text-base">{item.name}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const ImageModal = () => {
  return (
    <View className=" w-full bg-white rounded-t-lg p-4 	">
      <FlatList
        data={ImageModalData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ImageModal;

const styles = StyleSheet.create({});
