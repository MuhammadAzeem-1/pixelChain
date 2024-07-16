import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React , {useState }from "react";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";

const renderItem = ({ item }) => (
  <View className="mx-4">
    <View className="flex flex-row items-center ">
      <Text className="font-pregular text-base tracking-wide">May 11</Text>
      <Image source={icons.dot} resizeMode="contain" className="w-2 h-2 px-2" />
      <Text className="font-pregular text-base tracking-wide">1 item</Text>
    </View>

    <View>
      <Text className="py-2 text-lg font-pregular font-bold tracking-wider">
        Memory Name
      </Text>

      <Image
        source={images.thumbnail}
        resizeMode="cover"
        className="w-60 h-48 rounded-lg ml-12"
      />
    </View>

    <View className="flex justify-end items-end">
      <TouchableOpacity className="border rounded-full">
        <Image
          source={icons.menu2}
          className="h-4 w-4 m-1"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  </View>
);

const bookmark = () => {
  const [newMemory, setNewMemory] = useState(false)
  
  const toggleMemory = () => {
    setNewMemory(!newMemory)
  }


  return (
    <SafeAreaView className="bg-gray-50	h-full">
      <Header />

      {newMemory ? (
        <View>
          <View className="flex flex-row justify-end items-end m-8">
            <TouchableOpacity className="bg-gray-300 flex flex-row justify-center items-center rounded-2xl gap-2 pb-2 px-2 " onPress={toggleMemory}>
              <Image
                source={icons.plus2}
                className="w-4 h-4"
                resizeMode="cover"
              />
              <Text className="text-base font-pregular">Add memory</Text>
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              data={[{ id: "1" }, { id: "2" }]}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      ) : (
        <View className="w-full h-full flex justify-center items-center ">
          <Image
            source={images.cards}
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

            <TouchableOpacity className="px-4 py-2 rounded-xl bg-blue-300	" onPress={toggleMemory}>
              <Text className="text-black tracking-wide text-base">
                Create a memory
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default bookmark;

const styles = StyleSheet.create({});
