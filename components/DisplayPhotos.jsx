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

const DisplayPhotos = ({ item }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlelongPress = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View className="flex flex-col  px-4 mb-2">
      <View>
        <View className="flex flex-row justify-between items-center">
          <Text className="text-xl text-black">Todays</Text>
          <Image
            source={images.checkbox}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity onLongPress={() => handlelongPress(images.thumbnail)}>
          <Image
            source={images.thumbnail}
            resizeMode="contain"
            className="w-32 h-28"
          />
        </TouchableOpacity>

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={handleModal}
          className="flex justify-end "
        >
          <View className="flex-1 flex justify-end items-center">
            <ImageModal />
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default DisplayPhotos;

const styles = StyleSheet.create({});
