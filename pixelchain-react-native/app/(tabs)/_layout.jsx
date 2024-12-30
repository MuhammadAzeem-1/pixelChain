import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Stack, Tabs } from "expo-router";
// import { icons } from "../../constants";
import { StatusBar } from "expo-status-bar";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center ">
      {icon === "photos" && (
        <Entypo
          name="home"
          size={focused ? 28 : 24}
          color={focused ? "#FFA001" : "black"}
        />
      )}

      {icon === "memories" && (
        <MaterialIcons
          name="bookmark-add"
          size={focused ? 28 : 24}
          color={focused ? "#FFA001" : "black"}
        />
      )}

      {/* {icon === "camera" && (
        <Entypo
          name="camera"
          size={focused ? 28 : 24}
          color={focused ? "#FFA001" : "black"}
        />
      )} */}

      {icon === "library" && (
        <Ionicons
          name="settings-sharp"
          size={focused ? 28 : 24}
          color={focused ? "#FFA001" : "black"}
        />
      )}

      {icon === "profile" && (
        <Ionicons
          name="person"
          size={focused ? 28 : 24}
          color={focused ? "#FFA001" : "black"}
        />
      )}

      {/* <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-[10px]`}
        style={{ color: color }}
      >
        {name}
      </Text> */}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#EAF2FF",
            height: 50,
            position: "absolute", // Makes the tabs float and lets you adjust positioning
            bottom: 10, // Adjust the distance from the bottom of the screen
            marginHorizontal: 10, // Adds space on the sides
            borderRadius: 30,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 10,
          },
        }}
      >
        <Tabs.Screen
          name="photos"
          options={{
            title: "Photos",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"photos"}
                color={color}
                name="Photos"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="memories"
          options={{
            title: "Folders",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"memories"}
                color={color}
                name="Memories"
                focused={focused}
              />
            ),
          }}
        />

        {/* <Tabs.Screen
          name="camera"
          options={{
            title: "camera",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#FFA001",
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -30, // Makes it float above the other tabs
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  elevation: 10,
                }}
              >
                <TabIcon icon={"camera"} />
              </View>
            ),
          }}
        /> */}

        <Tabs.Screen
          name="library"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"library"}
                color={color}
                name="Library"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Payments",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={"profile"}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
