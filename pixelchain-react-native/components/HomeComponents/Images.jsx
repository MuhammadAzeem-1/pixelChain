import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import EmptyState from "../EmptyState";
import moment from "moment";
import DisplayPhotos from "../DisplayPhotos";
import { icons } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../lib/albumsThunks";
import { clearImages } from "../../context/Services/photosSlice";
import AntDesign from "@expo/vector-icons/AntDesign";

const Images = ({ images, loading }) => {
  const dispatch = useDispatch();
  const [groupedAlbums, setGroupedAlbums] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const nextToken = useSelector((state) => state.album.nextToken);
  const hasMore = useSelector((state) => state.album.hasMore);

  const onRefresh = async () => {
    dispatch(clearImages());
    //
    dispatch(fetchData({ continuationToken: null }));
  };

  const handleFetch = () => {
    dispatch(fetchData({ continuationToken: nextToken }));
  };

  const groupByDate = (albums) => {
    if (albums.length === 0) return [];

    const grouped = albums.reduce((acc, album) => {
      const dateKey = moment(album?.modifiedDate).startOf("day").format(); // Group by the start of the day

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      // Include only relevant fields in the grouped result
      acc[dateKey].push({
        url: album.imageUrl,
        Key: album.imageName,
        LastModified: album.modifiedDate,
        Size: album.size,
      });

      return acc;
    }, {});

    return Object.entries(grouped).map(([date, images]) => ({
      date,
      images,
    }));
  };

  const renderGroup = ({ item, index }) => {
    const isToday = moment(item.date).isSame(moment(), "day"); // Check if the date is today

    const displayDate = isToday
      ? "Today"
      : moment(item.date).format("DD MMM YYYY");

    // Delete the selected image
    const handleDeleteImage = () => {
      if (deleteImageData) {
        const updatedAlbums = groupedAlbums.map((group) => ({
          ...group,
          images: group.images.filter(
            (image) => image.id !== deleteImageData.id // Remove the image by id
          ),
        }));
        setGroupedAlbums(updatedAlbums); // Update the grouped albums state
        setDeleteImageData(null); // Reset the delete image data
      }
    };

    return (
      <View>
        <View className="flex flex-row justify-between items-center mt-4">
          <Text className="ml-1 text-sm text-black font-medium">
            {displayDate}
          </Text>
          {/* {deleteImageData &&
            deleteImageData.imageData?.id === item.images[0].imageData.id && (
              <TouchableOpacity onPress={handleDeleteImage}>
                <MaterialIcons name="delete" size={24} color="#E86339" />
              </TouchableOpacity>
            )} */}
        </View>

        <View className="flex flex-row flex-wrap  h-full">
          {item.images.map((image, index) => (
            <DisplayPhotos
              item={image}
              index={index}
              images={item.images}
              // setDeleteImageData={setDeleteImageData}
            />
          ))}
        </View>
      </View>
    );
  };

  useEffect(() => {
    setGroupedAlbums(groupByDate(images)); // Group albums by date on load
  }, [images]);

  return (
    <View className={"max-h-[80%] "}>
      {loading && !hasMore ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 16,
          }}
        >
          <Image
            source={icons.loading}
            style={{ width: 112, height: 96, marginTop: 8 }}
          />
        </View>
      ) : (
        <>
          <View className="max-h-[100%] ">
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
              // onEndReachedThreshold={0.1}
              // onEndReached={() => {
              //   dispatch(fetchData({ continuationToken: nextToken }));
              // }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
          <View>
            {loading && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={icons.loading}
                  style={{ width: 112, height: 96, marginTop: 8 }}
                />
              </View>
            )}
          </View>
          <View className="flex justify-center items-center">
            {hasMore && (
              <TouchableOpacity
                onPress={handleFetch}
                className="bg-blue-300 mt-2 px-4 py-2 rounded-full flex flex-row items-center "
              >
                <AntDesign name="clouddownloado" size={18} color="black" />
                <Text className="text-sm font-semibold pl-2">Load More</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default Images;
