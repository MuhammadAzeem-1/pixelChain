import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";


const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const AlbumsCreated = ({ activeItem, item }) => {
  const [isMemories, setIsMemories] = useState(false);

  return (
    <Animatable.View
      className="mr-4"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {isMemories ? (
        <Text>Create Your memories</Text>
      ) : (
            <TouchableOpacity>
            {typeof item.image === 'string' ? (
                <>
                <ImageBackground
                    source={{ uri: item.image }}
                    style={{ width: 180, height: 180, borderRadius: 22, marginVertical: 2, overflow: 'hidden', shadowColor: 'black', shadowOpacity: 0.4 }}
                    resizeMode="cover"
                >
                </ImageBackground>
                <Text style={{ fontSize: 17, fontWeight: '600', color: '#333' }}>Camera</Text>
                </>
                ) : (
                <>
                    <ImageBackground
                        source={item.image}
                        style={{ width: 180, height: 180, borderRadius: 22, marginVertical: 2, overflow: 'hidden', shadowColor: 'black', shadowOpacity: 0.4 }}
                        resizeMode="cover"
                    >
                    </ImageBackground>
                    <Text style={{ fontSize: 17, fontWeight: '600', color: '#333' }}>New album</Text>
                </>
                )}
            </TouchableOpacity>
      )}
    </Animatable.View>
  );
};



const Albums = ({ data }) => {
  const [activeItem, setActiveItem] = useState(data[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}

      className="w-[100%]"
      renderItem={({ item }) => (
        <View className="flex-row justify-between items-start">
          <AlbumsCreated activeItem={activeItem} item={item} />
        </View>
      )}

      onViewableItemsChanged={viewableItemsChanged}

      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      numColumns={2}
      contentContainerStyle={{ padding: 4}}
      contentOffset={{ x: 0 }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Albums;
