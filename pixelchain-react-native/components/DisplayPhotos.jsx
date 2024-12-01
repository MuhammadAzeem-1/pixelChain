import React, { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { images } from "../constants";
import ImageModal from "./modal/ImageModal";
import ImageViewing from "react-native-image-viewing";

const DisplayPhotos = ({ item, index, images, setDeleteImageData }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handlelongPress = (image) => {
    console.log("long press");

    setSelectedImage(image);
    console.log("selectedImage", item);

    // setDeleteImageData(item);
  };

  const handleImagePress = (index) => {
    setCurrentIndex(index); // Set the image for full-screen view
    setIsVisible(true); // Open the image viewer
  };

  return (
    <View className="flex flex-row p-[1px]">
      <View>
        <TouchableOpacity
          onLongPress={handlelongPress}
          onPress={() => handleImagePress(index)}
        >
          <Image source={{ uri: item.url }} className="w-28 h-24 mt-2" />
        </TouchableOpacity>

        {/* Full-screen image viewer */}
        <ImageViewing
          images={images.map((image) => ({ uri: image.url }))} // Pass the whole images array
          imageIndex={currentIndex} // Set the starting index to the current image
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
        />
      </View>
    </View>
  );
};

export default DisplayPhotos;

const styles = StyleSheet.create({});
