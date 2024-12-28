import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { icons } from "../constants";

const TextBox = ({
  placeholder,
  value,
  editable,
  password,
  isWallet,
  Label,
}) => {
  return (
    <View>
      <Text className="mt-3 mb-1">{Label}</Text>
      <View className="w-full h-12 px-4 bg-gray-200 rounded-2xl border-2 border-gray-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-primary text-xs font-semibold"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B&B8B"
          editable={editable}
        />

        {password && (
          <TouchableOpacity>
            <Image
              source={!true ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contains"
            />
          </TouchableOpacity>
        )}

        {isWallet && (
          <TouchableOpacity>
            <Image
              source={icons.copy}
              resizeMode="contain"
              className="w-4 h-4"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({});
