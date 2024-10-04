import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const FormFeild = ({
  title,
  otherStyles,
  value,
  placeholder,
  handleChangetext,
  disabled,
  secure = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black font-medium	tracking-wider	">{title}</Text>

      <View className="w-full h-12 px-4 bg-[#E7F4E8] rounded-2xl border-2 border-blue-100	 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-normal text-sm"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B&B8B"
          onChangeText={handleChangetext}
          secureTextEntry={secure}
          editable={disabled}
          {...props}
        />

      
      </View>
    </View>
  );
};

export default FormFeild;

  {/* {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contains"
            />
          </TouchableOpacity>
        )} */}