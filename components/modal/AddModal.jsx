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
    <TouchableOpacity className="flex flex-row items-center gap-8 mt-1 px-4">
      <Image source={item.image} className="w-6 h-6" resizeMode="contain" />
      <Text className="text-base">{item.name}</Text>
    </TouchableOpacity>
  </View>
);

const AddModal = () => {
  return (
    <View className="w-full m-0 bg-white rounded-t-lg pt-4">
      <View>
        <Text className="text-xl font-bold pl-4">Create new</Text>
      </View>

      <View>
        <FlatList
          data={AddModalData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View className=" bg-slate-200 p-6 mt-3">
        <Text className="text-base capitalize">visit our website for more Details </Text>
        
      </View>

    </View>
  );
};

export default AddModal;

const styles = StyleSheet.create({});
