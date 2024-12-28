import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AccountInfoLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="accountinfo"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="uploadimages"
          options={{
            headerShown: false, // Set this to true or false depending on your needs
            title: "Upload Images", // You can customize the title for this screen
          }}
        />

        <Stack.Screen
          name="newfolder"
          options={{
            headerShown: false, // Set this to true or false depending on your needs
            title: "New Folder", // You can customize the title for this screen
          }}
        />

        <StatusBar backgroundColor="#161622" style="light" />
      </Stack>
    </>
  );
};

export default AccountInfoLayout;
