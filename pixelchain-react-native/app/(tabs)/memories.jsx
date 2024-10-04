import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import CreateMemory from "../../components/memories/CreateMemory";
import { useDispatch, useSelector } from "react-redux";
import {
  addMemory,
  deleteMemory,
  editMemory,
} from "../../context/Services/memoriesSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

const RenderItem = ({ item, handleDeleteMemory }) => (
  <View className="mx-4 my-4">
    <View className="flex flex-row items-center justify-between">
      <Text className="font-pregular text-xs text-gray-400 tracking-wide">
        {item.date}
      </Text>

      <TouchableOpacity onPress={() => handleDeleteMemory(item.id)}>
        <AntDesign name="delete" size={15} color="#E86339" />
      </TouchableOpacity>
    </View>

    <View>
      <Text className=" text-base font-pregular font-semibold tracking-wider">
        {item.memoryName}
      </Text>

      <Image
        source={{ uri: item.memoryImage }}
        resizeMode="cover"
        className="w-[100%] h-48 rounded-lg"
      />
    </View>

    {/* <View className="flex justify-end items-end">
      <TouchableOpacity className="border rounded-full">
        <Image
          source={icons.menu2}
          className="h-4 w-4 m-1"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View> */}
  </View>
);

const bookmark = () => {
  const dispatch = useDispatch();
  const memories = useSelector((state) => state.memories.memories);
  const [newMemory, setNewMemory] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [memoryData, setMemoryData] = useState({
    id: Date.now().toString(), // Generate unique ID
    date: new Date().toDateString(),
    memoryName: "",
    memoryTitle: "",
    memoryImage: "",
  });

  console.log(memories, "memories");

  const toggleMemory = () => {
    setNewMemory(!newMemory);
  };

  const handleAddMemoryClick = () => {
    setIsFormVisible(!isFormVisible); // Show the form when button is clicked
  };

  const handleAddMemory = () => {
    setMemoryData({
      id: Date.now().toString(), // Generate unique ID
      date: new Date().toDateString(),
      memoryName: "",
      memoryTitle: "",
      memoryImage: "",
    });

    dispatch(addMemory(memoryData));
    setIsFormVisible(!isFormVisible);
  };

  const handleEditMemory = (id, updatedData) => {
    dispatch(editMemory({ id, updatedData }));
  };

  const handleDeleteMemory = (id) => {
    dispatch(deleteMemory(id));
  };

  return (
    <SafeAreaView className="bg-gray-50	h-full">
      <Header />

      {isFormVisible ? (
        <CreateMemory
          memoryData={memoryData}
          setMemoryData={setMemoryData}
          handleAddMemory={handleAddMemory}
          handleAddMemoryClick={handleAddMemoryClick}
        />
      ) : (
        <>
          {memories.length > 0 ? (
            <View className="h-[85%]">
              <View className="flex flex-row justify-end items-end m-4">
                <TouchableOpacity
                  onPress={handleAddMemoryClick}
                  className="bg-[#EAF2FF] flex flex-row justify-center items-center rounded-2xl py-1 px-2 "
                >
                  <Feather name="plus" size={15} color="black" />

                  <Text className="text-sm font-pregular ml-2">Add memory</Text>
                </TouchableOpacity>
              </View>

              <View>
                <FlatList
                  data={memories}
                  renderItem={({ item }) => (
                    <RenderItem
                      item={item}
                      handleDeleteMemory={handleDeleteMemory}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                />
              </View>
            </View>
          ) : (
            <View className="w-full h-full flex justify-center items-center ">
              <Image
                source={images.memorycards}
                className="max-w-[350px] w-full h-[248px]"
                resizeMode="contain"
              />

              <Text className="text-xl tracking-wider font-pregular">
                Welcome to Memories
              </Text>

              <Text className="text-base w-72 tracking-wide text-center	my-2">
                The more Photos you backup, the more memories will automatically
                will appear here.
              </Text>

              <View className="flex justify-center gap-4 ">
                <TouchableOpacity className="px-4 py-2 rounded-xl bg-blue-800	">
                  <Text className="text-white tracking-wide text-base">
                    {" "}
                    Set up backup
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleAddMemoryClick}
                  className="px-4 py-2 rounded-xl bg-blue-300"
                >
                  <Text className="text-black tracking-wide text-base">
                    Create a memory
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default bookmark;

const styles = StyleSheet.create({});
