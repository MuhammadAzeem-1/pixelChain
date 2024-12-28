import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Slider from "../../components/Slider";
import Images from "../../components/HomeComponents/Images";
import Files from "../../components/HomeComponents/Files";
import Folders from "../../components/HomeComponents/Folders";
import { fetchData } from "../../lib/albumsThunks";

const home = () => {
  const dispatch = useDispatch(); // Access Redux dispatch function

  // Access images and files from the Redux state
  const images = useSelector((state) => state.album.images);
  const files = useSelector((state) => state.album.files);
  const loading = useSelector((state) => state.album.loading);
  const error = useSelector((state) => state.album.error);
  const continuationToken = false

  const [isTabSelected, setIsTabSelected] = useState("images");  

  const getImages = async () => {
    dispatch(fetchData());
  };

  const onRefresh = async () => {};

  useEffect(() => {
    dispatch(fetchData(continuationToken));
  }, []);

  return (
    <SafeAreaView className="bg-gray-50	 h-full">
      <Header />

      {/* <Slider
        setIsTabSelected={setIsTabSelected}
        isTabSelected={isTabSelected}
      /> */}

      {/* <View>
        <TouchableOpacity onPress={getImages}>
          <Text>Get Images</Text>
        </TouchableOpacity>
      </View> */}

        <Images images={images} loading={loading} />


      {/* {isTabSelected === "files" && <Files files={files} loading={loading} />}

      {isTabSelected === "folders" && <Folders />} */}
    </SafeAreaView>
  );
};

export default home;
