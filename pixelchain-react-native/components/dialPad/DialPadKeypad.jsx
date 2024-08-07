import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const DialPadKeypad = ({
  dialPadContent,
  pinLength,
  dialPadSize,
  dialPadTextSize,
  setCode,
  code,
}) => {
  return (
    <FlatList
      data={dialPadContent}
      numColumns={3} // set number of columns
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            disabled={item === ""} // make the empty space on the dialpad content unclickable
            onPress={() => {
              if (item === "X") {
                setCode((prev) => prev.slice(0, -1));
              } else {
                if (code.length === pinLength - 1) {
                  console.log("Code is complete", code);
                }
                setCode((prev) => [...prev, item]);
              }
            }}
          >
            <View
              style={[
                {
                  backgroundColor: item === "" ? "transparent" : "#fff",
                  width: dialPadSize,
                  height: dialPadSize,
                },
                styles.dialPadContainer,
              ]}
            >
              {item === "X" ? (
                <Feather name="delete" size={dialPadTextSize} color="#3F1D38" />
              ) : (
                <Text
                  style={[{ fontSize: dialPadTextSize }, styles.dialPadText]}
                >
                  {item}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default DialPadKeypad;

const styles = StyleSheet.create({
  dialPadContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 50,
    borderColor: "transparent",
  },
  dialPadText: {
    color: "#3F1D38",
  },
});
