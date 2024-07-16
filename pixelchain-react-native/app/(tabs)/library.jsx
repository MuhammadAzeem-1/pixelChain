import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "../../constants";
import { data, NewAlbumdata } from "../../constants/data";
import Folders from "../../components/Folders";
import Albums from "../../components/Albums";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const create = () => {

  const [refreshing, setRefreshing] = useState(false);

  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });


  const submit = () => {

  }

  const onRefresh = async () => {};


  return (
    <SafeAreaView className="bg-white h-full">

        <Header />

        <View className="flex-row items-center h-[150px] justify-between mx-4">
          
          <TouchableOpacity className="flex-row items-center justify-evenly w-[160px] h-70 py-4 bg-blue-100 rounded-xl" onPress={() => {}}>
            <Image source={icons.star2} className="w-[30px] h-[30px] justify-between"/>
            <Text className="text-[18px] font-pmedium text-gray-800 top-[2px]">Favorites</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-evenly w-[160px] h-70 py-4 bg-blue-100 rounded-xl" onPress={() => {}}>
            <Image source={icons.trash} className="w-[30px] h-[30px] justify-between"/>
            <Text className="text-[18px] font-pmedium text-gray-800 top-[2px]">Trash</Text>
          </TouchableOpacity>

        </View>

        <View className="flex-row items-center justify-between mx-4">
          <Text className="text-[18px] font-pmedium text-gray-700">Photos on device</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text className="text-[18px] font-pmedium text-[#3993BF]">
              View All
            </Text>
          </TouchableOpacity>
        </View>


        <View className="h-fit">
          <FlatList
            data={[{ id: "1" }, { id: "2" }, { id: "3" }]}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ flexGrow: 1 }}

            ListHeaderComponent={() => (
              <View className="flex my-4 px-4 space-y-4">
                  <Folders data={data} />
              </View>
            )}
            
            ListEmptyComponent={() => (
              <EmptyState
                title="Permission Required"
                subtitle="No Permissions"
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>

        {/* Albmus */}
        <View className="flex-row items-center justify-between mx-4">
          <Text className="text-[18px] font-pmedium text-[#3993BF]">Recent Photo</Text>
          <Text className="text-[18px] font-pmedium text-gray-700">Albums</Text>
        </View>

        <View  style={{ flex: 1 }} className="w-[100%]">  
            <FlatList 
              data={[{ id: "1" }, { id: "2" }, { id: "3" }]}
              keyExtractor={(item) => item.id}

              ListHeaderComponent={() => (
                <View className="flex my-4 px-4 space-y-4">
                    <Albums data={NewAlbumdata} />
                </View>
              )}

              ListEmptyComponent={() => (
                <EmptyState
                  title="No Albums"
                  subtitle="No Albums"
                />
              )}

              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
        </View>

    </SafeAreaView>
  );
};

export default create;

const styles = StyleSheet.create({});
