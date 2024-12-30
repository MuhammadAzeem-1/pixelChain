import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import { createFolder, fetchImagesByFolder } from "../../lib/albumsThunks";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { updateCurrentFolder } from "../../context/Services/photosSlice";
import Feather from "@expo/vector-icons/Feather";

const bookmark = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.album.folders);
  const loading = useSelector((state) => state.album.loading);
  const error = useSelector((state) => state.album.error);

  console.log(folders, "folders ---- () -----");

  const [modalVisible, setModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      alert("Folder name cannot be empty.");
      return;
    }

    try {
      dispatch(updateCurrentFolder(newFolderName));

      dispatch(createFolder({ folderName: newFolderName }));
      if (!loading) {
        setTimeout(() => {
          router.push("/newfolder");
        }, 5000);
      }

      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openNewFolder = (folderName) => {

    const Name = folderName?.endsWith("/")
      ? folderName?.slice(0, -1)
      : folderName;

    dispatch(updateCurrentFolder(Name));

    // dispatch(getFolderImages({ folderName: folderName }));

    dispatch(fetchImagesByFolder({ folderName: Name, continuationToken: null }))
      .then((response) => {
          router.push("/newfolder");

      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  };

  return (
    <SafeAreaView className="bg-white	h-full">
      <Header />

      <View className="flex justify-between items-center py-2 h-full">
        {/* Create Folder Button */}
        <View className="flex justify-end items-end  w-full px-1">
          <TouchableOpacity
            className="bg-blue-500 rounded-full flex flex-row justify-start items-center px-2 py-1 mb-4"
            onPress={() => setModalVisible(true)}
          >
            <AntDesign name="plus" size={15} color="white" />
            <Text className="text-white font-bold pl-2">Create New Folder</Text>
          </TouchableOpacity>
        </View>

        {folders && folders.length > 0 ? (
          <>
            <FlatList
              data={folders}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => openNewFolder(item.Key)}>
                  <View className="flex justify-start items-center flex-row gap-4 mb-2 border-b-[1px] border-gray-100 pb-2 px-2">
                    <Feather name="file" size={20} color="black" />
                    <View className="w-full truncate">
                      <Text className="text-base font-medium">
                        {item?.Key?.endsWith("/")
                          ? item?.Key?.slice(0, -1)
                          : item.Key}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </>
        ) : (
          <>
            <View className="flex justify-center items-center">
              <FontAwesome name="search" size={30} color="black" />
              <Text className="text-center text-gray-400">No Folder Exits</Text>
            </View>
          </>
        )}

        {/* Modal for Creating Folder */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black bg-opacity-90">
            <View className="bg-white rounded-lg p-6 w-80">
              <Text className="text-lg font-bold mb-4">Create New Folder</Text>
              <TextInput
                className="border p-2 mb-4 rounded"
                placeholder="Enter folder name"
                value={newFolderName}
                onChangeText={setNewFolderName}
              />
              <View className="flex-row justify-between">
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                <Button title="Create" onPress={handleCreateFolder} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default bookmark;

const styles = StyleSheet.create({});
