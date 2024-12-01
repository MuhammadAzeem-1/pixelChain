import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { uploadFileToS3 } from "../../lib/albumsThunks";
// import { uploadFileToS3 } from "../../context/Services/photosSlice";

export default function uploadImage() {
  const dispatch = useDispatch();
  const { uploadComplete } = useSelector((state) => state.album); // Access albums from Redux state
  // upload Images ---
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);

  console.log(uploadComplete, "uploadComplete");

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
        const imageData = result.assets[0];
        const imageUri = result.assets[0].uri;

        setImage(imageUri); // This will set the image URI
        console.log(imageData, "imageData");

        dispatch(uploadFileToS3({ fileUri: imageUri, fileName: imageData.fileName }));
      }
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to media library</Text>;
  }

  useEffect(() => {
    pickImage();
  }, []);

  // const uploadImage = async () => {
  //   dispatch(addAlbum({ imageData: selectedImage }));
  // };

  // const selectImage = async (image) => {
  //   setSelectedImage(image);
  // };

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }} className="bg-[#EAF2FF]">
      <View className="flex flex-row justify-start">
        <TouchableOpacity
          className="h-24 "
          onPress={() => router.push("/library")}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <Text className="text-base font-semibold ml-8">Upload Manager</Text>
      </View>

      {image && (
        <View className="flex justify-center items-center">
          <View className="bg-white w-[90%] p-2 shadow-md	 rounded-lg flex flex-row justify-between items-center">
            <View>
              <Image
                source={{ uri: image }}
                style={{ width: 60, height: 60 }}
                className={"rounded-sm"}
              />
            </View>
            <Text className={"text-[#3AC0A0] text-sm"}>
              {uploadComplete ? "Success" : "Uploading"}
            </Text>
          </View>
        </View>
      )}

      {image && (
        <View className="flex justify-center items-center">
          <TouchableOpacity
            onPress={() => router.push("/photos")}
            className="bg-[#3AC0A0] rounded-md px-2 py-1 mt-8"
          >
            <Text className="text-white text-sm">Go Back</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => selectImage(item)}
            onPress={() => setSelectedImage(null)}
          >
            <View
              className="relative m-1"
              style={{
                borderWidth: selectedImage?.uri === item.uri ? 2 : 0,
                borderColor:
                  selectedImage?.uri === item.uri ? "blue" : "transparent",
              }}
            >
              <Image
                source={{ uri: item.uri }}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
              {selectedImage?.uri === item.uri && (
                <View
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: 10,
                  }}
                >
                  <Ionicons name="checkmark" size={24} color="green" />
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      /> */}

      {/* {selectedImage && (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text>Selected Image:</Text>
          <Image
            source={{ uri: selectedImage.uri }}
            style={{ width: 300, height: 300 }}
          />
       
        </View>
      )} */}
    </SafeAreaView>
  );
}

// import * as ImagePicker from 'expo-image-picker';
// import { useEffect, useState } from 'react';
// import { Button, View, Text, Image } from 'react-native';

// export default function App() {
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
//     })();
//   }, []);

//   const pickImage = async () => {
//     // Open the image picker and allow the user to select an image
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="Pick an image from device" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//     </View>
//   );
// }
