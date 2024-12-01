import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";

const CreateMemory = ({
  memoryData,
  setMemoryData,
  handleAddMemory,
  handleAddMemoryClick,
}) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result?.canceled) {
      if (result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        console.log(imageUri, "imageUri");

        setImage(imageUri); // This will set the image URI
        setMemoryData({ ...memoryData, memoryImage: imageUri });
      }
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to media library</Text>;
  }

  return (
    <View className="flex justify-center items-center w-full h-full">
      <View className="p-4 bg-gray-50 rounded-lg m-2 w-full">
        {/* Memory Name Input */}

        

        <TextInput
          value={memoryData?.memoryName}
          onChangeText={(text) =>
            setMemoryData({ ...memoryData, memoryName: text })
          }
          placeholder="Title"
          className="bg-white p-2 rounded-lg mb-4 border border-gray-300"
        />

        <TextInput
          value={memoryData?.memoryTitle}
          onChangeText={(text) =>
            setMemoryData({ ...memoryData, memoryTitle: text })
          }
          placeholder="Description"
          className="bg-white p-2 rounded-lg mb-4 border border-gray-300"
          multiline={true} // Enables multiple lines like a textarea
          numberOfLines={4} // Suggests the number of lines to display initially
          style={{ height: 150, textAlignVertical: "top" }} // Adjust the height and text alignment
        />

        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 64, height: 64 }} // Replace w-8 h-8 with exact dimensions
          />
        )}

        {/* Image Picker Button */}
        <Button
          onPress={() => pickImage()}
          title="Select Image from Gallery"
          color="#b4dbff"
          accessibilityLabel="Learn more about this purple button"
        />

        {/* Save Memory Button */}
        <TouchableOpacity
          className="bg-[#3AC0A0] py-2 px-4 rounded-lg flex justify-center items-center mt-8"
          onPress={handleAddMemory}
          disabled={
            !memoryData?.memoryName || !memoryData?.memoryTitle || !image
          }
        >
          <Text className="text-white">Save Memory</Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          className="mt-4 flex justify-center items-center flex-row "
          onPress={handleAddMemoryClick}
        >
          <AntDesign name="arrowleft" size={15} color="black" />
          <Text className="text-black ml-2">Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateMemory;

const styles = StyleSheet.create({});
