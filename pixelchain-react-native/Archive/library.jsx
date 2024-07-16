import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import FormFeild from "../../components/FormFeild";
import CustomButton from "../../components/CustomButton"
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";

const create = () => {
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });


  const submit = () => {

  }


  return (
    <SafeAreaView className="bg-primary h-full mt-8">
      
      <ScrollView className="px-4 my-6">

        <Text className="text-2xl text-white font-psemibold">
          Upload Videos
        </Text>

        <FormFeild
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangetext={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <TouchableOpacity>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
               <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                  <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center ">
                      <Image 
                         source={icons.upload}
                         resizeMode="contain"
                         alt="upload"
                         className="w-1/2 h-1/2"
                      />
                  </View>
               </View>
            )}
          </TouchableOpacity>
        </View>


        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Imaga
          </Text>

          <TouchableOpacity>
            {form.thumbnail ? (
              <Image 
                 source={{uri: form.thumbnail.uri}}
                 resizeMode="cover"
                 className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                  <Image 
                     source={icons.upload}
                     resizeMode="contain"
                     alt="upload"
                     className="w-5 h-5"
                  />

                  <Text className="text-sm text-gray-100 font-pmedium">
                    Choose a file
                  </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormFeild 
           title="AI Prompt"
           value={form.prompt}
           placeholder="The AI prompt of your video..."
           handleChangetext={(e) => setForm({...form, prompt:e})}
           otherStyles="mt-7"
        />

        <CustomButton 
           title="Submit & Publish"
           handlePress={submit}
           containerStyles="mt-7"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default create;

const styles = StyleSheet.create({});
