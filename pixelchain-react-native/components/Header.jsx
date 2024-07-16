import React, { useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
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
  
    <View className="flex justify-between items-start flex-row mx-2 mt-2">
      <View className="flex-row items-start justify-center">
        <Text className="text-2xl font-psemibold text-blue-600">P</Text>
        <Text className="text-2xl font-psemibold text-red-500">i</Text>
        <Text className="text-2xl font-psemibold text-yellow-400">x</Text>
        <Text className="text-2xl font-psemibold text-blue-600">e</Text>
        <Text className="text-2xl font-psemibold text-green-500">l</Text>
        <Text className="text-2xl font-psemibold text-gray-700 ml-[2px]">
          Chain
        </Text>
      </View>

      <View className="flex flex-row items-center gap-4">
        <TouchableOpacity onPress={handleAddModal}>
          <Image
            source={images.add}
            className="h-6 w-6 rounded-full"
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleProfileModal}>
          <View className="w-12 h-12 border border-secondary rounded-full px-1 py-1 flex justify-center items-center">
            <Image
              source={images.profile}
              className="w-[100%] h-[100%] rounded-full"
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>

        {/* Profile Modal */}
        <Modal isVisible={isProfileModalVisible}>
          <View className="flex-1  flex justify-center items-center">
            <ProfileModal handleProfileModal={handleProfileModal} />
          </View>
        </Modal>

        {/* Modal to add new */}

        <Modal
          isVisible={isAddModalVisible}
          onBackdropPress={handleAddModal}
          className="flex  justify-end "
        >
          <View className="flex-1  flex justify-end items-center">
            <AddModal />
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
