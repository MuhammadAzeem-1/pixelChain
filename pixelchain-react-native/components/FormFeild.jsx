import React from "react";
import { View, Text, TextInput } from "react-native";
import { icons } from "../constants";

const FormFeild = ({
  title,
  otherStyles,
  value,
  placeholder,
  handleChangetext,
  disabled =false,
  secure = false,
  name,
  ...props
}) => {
  return (
    <View className={`space-y-1 ${otherStyles}`}>
      <Text className="text-base text-black font-medium	tracking-wider	">
        {title}
      </Text>

      <View className="w-full h-12 px-4 bg-gray-50 rounded-lg border-[1px] border-blue-100	 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-normal text-xs"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B&B8B"
          onChangeText={(text) => handleChangetext(text, name)}
          secureTextEntry={secure}
          // editable={disabled}
          {...props}
        />
      </View>
    </View>
  );
};

export default FormFeild;

{
  /* {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contains"
            />
          </TouchableOpacity>
        )} */
}
