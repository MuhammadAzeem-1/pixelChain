import {
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
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

        <View className="h-[50px] mt-8 px-3 flex-row justify-between items-center">
          <View className="flex-row items-start justify-center">
            <Text className="text-2xl font-psemibold text-blue-600">P</Text>
            <Text className="text-2xl font-psemibold text-red-500">i</Text>    
            <Text className="text-2xl font-psemibold text-yellow-400">x</Text>
            <Text className="text-2xl font-psemibold text-blue-600">e</Text>
            <Text className="text-2xl font-psemibold text-green-500">l</Text>
            <Text className="text-2xl font-psemibold text-gray-700 ml-[2px]">Chain</Text>
          </View>
          <View className="w-12 h-12 border border-secondary rounded-full px-1 py-1 flex justify-center items-center">
            <Image
              source={ images.profile }
              className="w-[100%] h-[100%] rounded-full"
              resizeMode="cover"
            />
          </View>
        </View>

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
          <Text className="text-[20px] font-pmedium text-gray-700">Photos on device</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text className="text-[20px] font-pmedium text-[#3993BF]">
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
          <Text className="text-[20px] font-pmedium text-gray-700">Albums</Text>
          <Text className="text-[20px] font-pmedium text-[#3993BF]">Recent Photo</Text>
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
