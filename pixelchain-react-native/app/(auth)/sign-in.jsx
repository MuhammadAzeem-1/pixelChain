import {
  Animated,
  Image,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const { Value, Text: AnimatedText } = Animated;
const CELL_COUNT = 4;
const source = {
  uri: "https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png",
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const SignIn = () => {
  const [value, setValue] = useState("");
  const [isPinExist, setIsPinExist] = useState(false);
  const [firstTimeText, setFirstTimeText] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const storePin = async () => {
    try {
      await SecureStore.setItemAsync("userPin", value);
    } catch (error) {
      console.error("Error storing the PIN:", error);
    }
    setFirstTimeText(
      "PIN has been set successfully. Please enter your PIN again to unlock access."
    );
    setIsPinExist(true);
    setValue("");
  };

  const validatePin = async (enteredPin) => {
    const credentials = await SecureStore.getItemAsync("userPin");

    if (credentials) {
      return credentials === enteredPin;
    }
    return false;
  };

  const handlePinComplete = async (pin) => {
    // Compare the entered PIN with stored encrypted PIN
    if (validatePin(pin)) {
      // navigation.navigate("/"); // Direct user to the main content
      
      console.log("PIN is correct");
     router.push("/photos");
    } else {
      Alert.alert("Error", "Invalid PIN");
    }
  };

  // Function to clear stored PIN
  const clearStoredPin = async () => {
    try {
      await SecureStore.deleteItemAsync("userPin"); // Clear the stored PIN
      setIsPinExist(false);
      setFirstTimeText("");
      setValue("");

      Alert.alert(
        "Success",
        "Stored PIN has been removed. You can test the flow again."
      );
    } catch (error) {
      console.error("Error clearing stored PIN:", error);
      Alert.alert("Error", "Failed to clear stored PIN.");
    }
  };

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  useEffect(() => {
    const checkPin = async () => {
      const credentials = await SecureStore.getItemAsync("userPin");

      if (credentials) {
        setIsPinExist(true);
      } else {
        setIsPinExist(false);
      }
    };

    checkPin();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>
        {isPinExist ? "PIN Verification" : "Set a 4-Digit PIN"}
      </Text>
      <Image style={styles.icon} source={source} />
      <Text style={styles.subTitle}>
        {isPinExist
          ? `Enter your 4-digit PIN to unlock access.`
          : "Create a secure 4-digit PIN to protect your account."}
      </Text>
      <Text className="!text-red-400 pt-8 text-center">{firstTimeText}</Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      <TouchableOpacity
        style={styles.nextButton}
        onPress={isPinExist ? handlePinComplete : storePin}
        disabled={value.length > 3 ? false : true}
      >
        <Text style={styles.nextButtonText}>
          {isPinExist ? "Unlock" : "Set PIN"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={clearStoredPin}>
        <Text>Clear Stored PIN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignIn;

export const CELL_SIZE = 55;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = "#fff";
export const NOT_EMPTY_CELL_BG_COLOR = "#3557b7";
export const ACTIVE_CELL_BG_COLOR = "#f7fafe";

const styles = StyleSheet.create({
  codeFiledRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    fontSize: 30,
    textAlign: "center",
    borderRadius: CELL_BORDER_RADIUS,
    color: "#3759b8",
    backgroundColor: "#fff",

    // IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },

  // =======================

  root: {
    minHeight: 800,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    paddingTop: 50,
    color: "#000",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 40,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: "auto",
    marginRight: "auto",
  },
  subTitle: {
    paddingTop: 30,
    color: "#000",
    textAlign: "center",
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: "#3557b7",
    justifyContent: "center",
    minWidth: 300,
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
});

// import { router } from "expo-router";
// import React, { useRef, useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ToastAndroid,
// } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const SignIn = () => {
//   const [passcode, setPasscode] = useState("");
//   const [storedPasscode, setStoredPasscode] = useState(null);
//   const [confirmingPasscode, setConfirmingPasscode] = useState(false);
//   const [newPasscode, setNewPasscode] = useState("");
//   const code = useRef("");

//   useEffect(() => {
//     const fetchStoredPasscode = async () => {
//       const savedPasscode = await AsyncStorage.getItem("passcode");
//       if (savedPasscode) {
//         setStoredPasscode(savedPasscode);
//       }
//     };
//     fetchStoredPasscode();
//   }, []);

//   const handleNumberPress = async (number) => {
//     if (passcode.length < 4) {
//       code.current += number;
//       setPasscode((prevPasscode) => prevPasscode + number);

//       if (passcode.length === 3) {
//         if (!storedPasscode) {
//           if (!confirmingPasscode) {
//             setNewPasscode(code.current);
//             setPasscode("");
//             code.current = "";
//             setConfirmingPasscode(true);
//           } else if (code.current === newPasscode) {
//             await AsyncStorage.setItem("passcode", newPasscode);
//             setStoredPasscode(newPasscode);
//             router.push("/photos");
//           } else {
//             ToastAndroid.show("Passcodes do not match", ToastAndroid.SHORT);
//             code.current = "";
//             setPasscode("");
//           }
//         } else if (code.current === storedPasscode) {
//           router.push("/photos");
//         } else {
//           ToastAndroid.show("Wrong passcode", ToastAndroid.SHORT);
//           code.current = "";
//           setPasscode("");
//         }
//       }
//     } else {
//       code.current = "";
//       setPasscode("");
//     }
//   };

//   const handleDeletePress = () => {
//     setPasscode(passcode.slice(0, -1));
//     code.current = code.current.slice(0, -1);
//   };

//   const renderCircles = () => {
//     const circles = [];
//     for (let i = 0; i < 4; i++) {
//       circles.push(
//         <View key={i} style={styles.circle}>
//           {i < passcode.length && <View style={styles.filledCircle} />}
//         </View>
//       );
//     }
//     return circles;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Enter passcode</Text>
//       <View style={styles.circlesContainer}>{renderCircles()}</View>
//       <View style={styles.numbersContainer}>
//         {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
//           <TouchableOpacity
//             key={number}
//             style={styles.numberButton}
//             onPress={() => handleNumberPress(number.toString())}
//           >
//             <Text style={styles.numberText}>{number}</Text>
//           </TouchableOpacity>
//         ))}

//         <TouchableOpacity style={styles.numberButton}>
//           <Text>i</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.numberButton}
//           onPress={() => handleNumberPress("0")}
//         >
//           <Text style={styles.numberText}>0</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.numberButton}
//           onPress={handleDeletePress}
//         >
//           <Text>X</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default SignIn;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#2b2b2b",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     color: "white",
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   circlesContainer: {
//     flexDirection: "row",
//     marginBottom: 40,
//   },
//   circle: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "white",
//     margin: 5,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   filledCircle: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: "white",
//   },
//   numbersContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     width: "80%",
//     justifyContent: "center",
//   },
//   numberButton: {
//     width: "30%",
//     height: 80,
//     justifyContent: "center",
//     alignItems: "center",
//     margin: 5,
//     borderRadius: 40,
//     backgroundColor: "#424242",
//   },
//   numberText: {
//     color: "white",
//     fontSize: 32,
//   },
// });
