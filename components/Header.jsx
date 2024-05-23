import React, { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { images } from "../constants";
import Modal from "react-native-modal";
import ProfileModal from "./modal/ProfileModal";
import AddModal from "./modal/AddModal";

const Header = () => {
  const [isProfileModalVisible, setProfileModelVisible] = useState(false);
  const [isAddModalVisible, setAddModelVisible] = useState(false);

  const handleProfileModal = () => {
    setProfileModelVisible(!isProfileModalVisible);
  };

  const handleAddModal = () => {
    setAddModelVisible(!isAddModalVisible);
  };

  return (
    <View className="flex justify-between items-start flex-row mx-2">
      <View>
        <Text className="text-2xl font-psemibold text-black ">PIxelChain</Text>
      </View>

      <View className="flex flex-row items-center gap-8">
        <TouchableOpacity onPress={handleAddModal}>
          <Image
            source={images.add}
            className="h-6 w-6 rounded-full"
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleProfileModal}>
          <Image
            source={images.profile}
            className="h-8 w-8 rounded-full"
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Profile Modal */}
        <Modal isVisible={isProfileModalVisible}>
          <View className="flex-1  flex justify-center items-center">
            <ProfileModal handleProfileModal={handleProfileModal}/>
          </View>
        </Modal>

        {/* Modal to add new */}

        <Modal
          isVisible={isAddModalVisible}
          onBackdropPress={handleAddModal}
          className="flex  justify-end "
        >
          <View className="flex-1  flex justify-end items-center">
            <AddModal/>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
