import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import { StatusBar } from "expo-status-bar";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />

      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
    
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor : "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84
        }
      }}
    >
      <Tabs.Screen
        name="photos"
        options={{
          title: "Photos",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
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
          title: "Memories",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              color={color}
              name="Memories"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.library}
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
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>

    <StatusBar backgroundColor="#161622" style="light"/>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
