import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, RefreshControl, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import Header from "../../components/Header";
import { data } from "../../constants/data";
import DisplayPhotos from "../../components/DisplayPhotos";
import { useSelector } from "react-redux";
import moment from "moment";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const home = () => {
  const albums = useSelector((state) => state.album); // Access albums from Redux state
  const [refreshing, setRefreshing] = useState(false);
  const [deleteImageData, setDeleteImageData] = useState(null);
  const [groupedAlbums, setGroupedAlbums] = useState([]);

  const onRefresh = async () => {};

  console.log(albums, "albums");

  const groupByDate = (albums) => {
    if (albums.length === 0) return [];

    const grouped = albums.reduce((acc, album) => {
      const dateKey = moment(album.uploadDate).startOf("day").format(); // Group by the start of the day

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(album);
      return acc;
    }, {});

    return Object.entries(grouped).map(([date, images]) => ({
      date,
      images,
    }));
  };

  useEffect(() => {
    setGroupedAlbums(groupByDate(albums?.albums)); // Group albums by date on load
  }, [albums]);

  const renderGroup = ({ item }) => {
    
    const isToday = moment(item.date).isSame(moment(), "day"); // Check if the date is today
    const displayDate = isToday
      ? "Today"
      : moment(item.date).format("DD MMM YYYY");

    // Delete the selected image
    const handleDeleteImage = () => {
      console.log("delete image");
      
      if (deleteImageData) {
        console.log(deleteImageData, "deleteImageData");

        // const updatedAlbums = groupedAlbums.map((group) => ({
        //   ...group,
        //   images: group.images.filter(
        //     (image) => image.id !== deleteImageData.id // Remove the image by id
        //   ),
        // }));
        // setGroupedAlbums(updatedAlbums); // Update the grouped albums state
        // setDeleteImageData(null); // Reset the delete image data
      }
    };
    

    return (
      <View>
        <View className="flex flex-row justify-between items-center mx-2">
          <Text className="ml-1 text-xl text-black font-semibold">
            {displayDate}
          </Text>
          {deleteImageData &&
            deleteImageData.imageData?.id === item.images[0].imageData.id && (
              <TouchableOpacity onPress={handleDeleteImage}>
                <MaterialIcons name="delete" size={24} color="#E86339" />
              </TouchableOpacity>
            )}
        </View>

        <View className="flex flex-row flex-wrap ml-2">
          {item.images.map((image, index) => (
            <DisplayPhotos
              item={image}
              index={index}
              images={item.images}
              setDeleteImageData={setDeleteImageData}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-gray-50	 h-full">
      <Header />

      <View className="h-48">
        <Trending data={data} />
      </View>

      <FlatList
        data={groupedAlbums}
        keyExtractor={(item) => item.date}
        renderItem={renderGroup}
        ListEmptyComponent={() => (
          <EmptyState
            title="No images Found"
            subtitle="Please Upload some images to see them here"
            btn={false}
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
