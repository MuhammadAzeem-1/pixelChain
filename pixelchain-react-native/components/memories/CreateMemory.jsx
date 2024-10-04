import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const CreateMemory = ({ memoryData, setMemoryData, handleAddMemory, handleAddMemoryClick }) => {
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
    <View className="p-4 bg-gray-100 rounded-lg m-4">
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
      />

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 64, height: 64 }} // Replace w-8 h-8 with exact dimensions
        />
      )}

      {/* Image Picker Button */}
      <TouchableOpacity
        className="bg-blue-600 py-2 px-4 rounded-lg mb-4"
        onPress={() => pickImage()}
      >
        <Text className="text-white">Select Image from Gallery</Text>
      </TouchableOpacity>

      {/* Save Memory Button */}
      <TouchableOpacity
        className="bg-green-500 py-2 px-4 rounded-lg"
        onPress={handleAddMemory}
      >
        <Text className="text-white">Save Memory</Text>
      </TouchableOpacity>

      {/* Cancel Button */}
      <TouchableOpacity
        className="bg-green-500 py-2 px-4 rounded-lg mt-4"
        onPress={handleAddMemoryClick}
      >
        <Text className="text-white">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateMemory;

const styles = StyleSheet.create({});
