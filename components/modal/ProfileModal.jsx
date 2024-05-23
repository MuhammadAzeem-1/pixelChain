import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { icons, images } from "../../constants";
import CustomButton from "../CustomButton";

const ProfileModal = ({ handleProfileModal }) => {
  return (
    <View className="p-2 w-80 bg-slate-300 rounded-2xl">
      <View className="flex flex-row items-center gap-24">
        <TouchableOpacity onPress={handleProfileModal}>
          <Image
            source={icons.xbutton}
            className="w-4 h-4"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Image
          source={images.logo}
          className="w-28 h-12"
          resizeMode="contain"
        />
      </View>

      <View className="bg-white p-3 rounded-2xl">
        <View className="flex flex-row gap-4">
          <Image
            source={images.profile}
            className="h-12 w-12 rounded-full"
            resizeMode="contain"
          />

          <View>
            <Text className="text-base font-bold tracking-wider	">M Azeem</Text>
            <Text className="tracking-widest">test@gmail.com</Text>
          </View>
        </View>

        <View className="flex  pt-4">
          <View className="flex flex-row justify-center gap-1 items-center text-sm">
            {true ? (
              <>
                <Text className="text-base">Account Id</Text>

                <View className="flex flex-row justify-center items-center gap-1 bg-slate-200 p-1 rounded-2xl cursor-pointer">
                  <Text>121234</Text>
                  <Image
                    source={icons.copy}
                    className="h-4 w-4"
                    resizeMode="contain"
                  />
                </View>
              </>
            ) : (
              <TouchableOpacity
                className={`bg-violet-900 rounded-xl p-3 flex flex-row justify-center items-center`}
              >
                <Text className={`text-white font-psemibold text-base`}>
                  Connet Wallet
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="border my-4 w-full  border-slate-200	" />

          <View className="flex flex-row gap-4">
            <View>
              <Image
                source={icons.cloud}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </View>
            <View>
              <Text className="text-base font-psemibold">Backup your data</Text>
              <Text>
                Keep your photos safe by backing in Decentralized Storage
              </Text>
              <TouchableOpacity>
                <Text className="py-2 text-base text-slate-500 font-pmedium">
                  Turn on Backup
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="border my-4 w-full  border-slate-200	" />

          <View className="flex flex-row gap-4">
            <View>
              <Image
                source={images.logoSmall}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </View>

            <View>
              <Text className="text-base font-psemibold">Account Storage</Text>
              <View className="border my-2 w-56  border-slate-600	" />

              <Text>7.6 GB of 15 GB used</Text>

              <TouchableOpacity className="flex justify-center items-center mt-1">
                <Text className="p-2 text-base text-slate-500 font-pmedium border border-slate-400	rounded">
                  Get More Storage
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      
        <CustomButton title="View Full Profile" containerStyles="w-full mt-4" />
      
    </View>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({});
