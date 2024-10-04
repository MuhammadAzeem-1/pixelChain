import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AddModalData } from "../../constants/data";

const renderItem = ({ item }) => (
  <View >
    <TouchableOpacity className="flex flex-row items-center gap-4 mt-1 px-8 pb-2 border-b-[1px] border-gray-100">
      <Image source={item.image} className="w-5 h-5" resizeMode="contain" />
      <Text className="text-sm font-pmedium pl-4">{item.name}</Text>
    </TouchableOpacity>
  </View>
);

const AddModal = () => {
  return (
    <View className="w-full bg-white rounded-t-3xl pt-4">
      <View>
        <Text className="text-lg font-semibold pl-4">Add New</Text>
      </View>

      <View>
        <FlatList
          data={AddModalData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View className="flex justify-center items-center bg-slate-200 p-2 mt-3">
        <Text className="text-sm capitalize ">
          visit our website for more Details{" "}
        </Text>
      </View>
    </View>
  );
};

export default AddModal;

const styles = StyleSheet.create({});
