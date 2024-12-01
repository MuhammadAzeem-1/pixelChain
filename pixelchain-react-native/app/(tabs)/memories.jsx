import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";

const bookmark = () => {
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.album.folders);
  const loading = useSelector((state) => state.album.loading);
  const error = useSelector((state) => state.album.error);
  //
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);

  console.log("images", images);

  // Helper function to convert bytes to MB
  const formatSizeInMB = (sizeInBytes) => {
    return (sizeInBytes / (1024 * 1024)).toFixed(2); // Convert to MB with 2 decimal places
  };

  // Helper function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  return (
    <SafeAreaView className="bg-white	h-full">
      <Header />


      <View className="flex justify-between items-center p-4 h-full">
        {folders && folders.length > 0 ? (
          <>
            <FlatList
              data={folders}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View className="flex justify-start items-center flex-row gap-4 mb-2 border-b-[1px] border-gray-100">
                    <AntDesign name="pdffile1" size={15} color="black" />

                    <View className="w-full truncate">
                      <Text className="text-sm font-medium">Personal</Text>

                      <View>
                        <Text className="text-xs font-light">Size: 1 MB</Text>
                        <Text className="text-xs font-light">
                          Date: 22 july 2014
                        </Text>
                      </View>
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
      </View>
    </SafeAreaView>
  );
};

export default bookmark;

const styles = StyleSheet.create({});
