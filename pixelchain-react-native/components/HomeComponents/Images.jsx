import { View, Text, FlatList, RefreshControl, Image } from "react-native";
import React, { useEffect, useState } from "react";
import EmptyState from "../EmptyState";
import moment from "moment";
import DisplayPhotos from "../DisplayPhotos";
import { icons } from "../../constants";

const Images = ({ images, loading }) => {
  const [groupedAlbums, setGroupedAlbums] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {};

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

  const renderGroup = ({ item }) => {
    const isToday = moment(item.date).isSame(moment(), "day"); // Check if the date is today
    const displayDate = isToday
      ? "Today"
      : moment(item.date).format("DD MMM YYYY");

    // Delete the selected image
    // const handleDeleteImage = () => {
    //   console.log("delete image");

    //   if (deleteImageData) {
    //     console.log(deleteImageData, "deleteImageData");

    //     const updatedAlbums = groupedAlbums.map((group) => ({
    //       ...group,
    //       images: group.images.filter(
    //         (image) => image.id !== deleteImageData.id // Remove the image by id
    //       ),
    //     }));
    //     setGroupedAlbums(updatedAlbums); // Update the grouped albums state
    //     setDeleteImageData(null); // Reset the delete image data
    //   }
    // };

    return (
      <View>
        <View className="flex flex-row justify-between items-center mx-2">
          <Text className="ml-1 text-sm text-black font-medium">
            {displayDate}
          </Text>
          {/*   {deleteImageData &&
            deleteImageData.imageData?.id === item.images[0].imageData.id && (
              <TouchableOpacity onPress={handleDeleteImage}>
                <MaterialIcons name="delete" size={24} color="#E86339" />
              </TouchableOpacity>
            )}*/}
        </View>

        <View className="flex flex-row flex-wrap ml-2">
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
    <View>
      {loading ? (
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
      )}
    </View>
  );
};

export default Images;
