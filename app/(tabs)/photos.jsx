import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import Header from "../../components/Header";
import { data } from "../../constants/data";
import DisplayPhotos from "../../components/DisplayPhotos";

const home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {};

  return (
    <SafeAreaView className="bg-gray-50	 h-full">
      <Header />

      
      <FlatList
        data={[{ id: "1" }, { id: "2" }, { id: "3" }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DisplayPhotos item={item} />}

        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-4">
            <View className="w-full flex-1 pb-8">
              <Text className="text-xl font-pregular text-gray-100 mb-2">
                Memories
              </Text>

              <Trending data={data} />
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState
            title="No images Found"
            subtitle="No images created Yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({});
