import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { uploadToS3WithFolder } from "../../lib/albumsThunks";
import DisplayPhotos from "../../components/DisplayPhotos";
import { Modal } from "react-native-web";

const NewFolder = () => {
  const dispatch = useDispatch(); // Access Redux dispatch function
  const currentFolder = useSelector((state) => state.album.currentFolder);
  const images = useSelector((state) => state.memories.FolderImages);
  const loading = useSelector((state) => state.memories.FolderImages);

  // upload Images ---
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);

  const transformImagesData = (images) => {
    return images.map((image) => ({
      url: image.url,
      Key: image.Key.split("/").pop(), // Extract file name from the key
      LastModified: image.LastModified,
      Size: image.Size,
    }));
  };

  const transformedImages = transformImagesData(images);

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

        // dispatch(uploadFileToS3({ fileUri: imageUri, fileName: imageData.fileName }));
        dispatch(
          uploadToS3WithFolder({
            fileUri: imageUri,
            fileName: imageData.fileName,
            folderName: currentFolder,
          })
        );
      }
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to media library</Text>;
  }

  const handleUploadData = () => {
    // Logic for "Upload Data" action
    pickImage();
  };

  console.log(transformedImages, "transformedImages=====");

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Upload Data Button */}
      <View style={styles.header}>
        <Text style={styles.title}>{currentFolder}</Text>
        <TouchableOpacity style={styles.button} onPress={handleUploadData}>
          <Text style={styles.buttonText}>Upload Data</Text>
        </TouchableOpacity>
      </View>

      {/* Content Section */}

      {loading && (
        <Modal transparent={true} animationType="fade">
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </Modal>
      )}

      <ScrollView>
        <View className="flex flex-row flex-wrap  h-full">
          {transformedImages.map((image, index) => (
            <DisplayPhotos
              key={index}
              item={image}
              index={index}
              images={transformedImages}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  content: {
    padding: 16,
  },
  contentText: {
    fontSize: 16,
    color: "#333",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    color: "#fff",
    fontSize: 16,
  },
});

export default NewFolder;
