import { router } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignIn = () => {
  const [passcode, setPasscode] = useState("");
  const [storedPasscode, setStoredPasscode] = useState(null);
  const [confirmingPasscode, setConfirmingPasscode] = useState(false);
  const [newPasscode, setNewPasscode] = useState("");
  const code = useRef("");
  

  useEffect(() => {
    const fetchStoredPasscode = async () => {
      const savedPasscode = await AsyncStorage.getItem("passcode");
      if (savedPasscode) {
        setStoredPasscode(savedPasscode);
      }
    };
    fetchStoredPasscode();
  }, []);

  const handleNumberPress = async (number) => {
    if (passcode.length < 4) {
      code.current += number;
      setPasscode((prevPasscode) => prevPasscode + number);

      if (passcode.length === 3) {
        if (!storedPasscode) {
          if (!confirmingPasscode) {
            setNewPasscode(code.current);
            setPasscode("");
            code.current = "";
            setConfirmingPasscode(true);
          } else if (code.current === newPasscode) {
            await AsyncStorage.setItem("passcode", newPasscode);
            setStoredPasscode(newPasscode);
            router.push("/photos");
          } else {
            ToastAndroid.show("Passcodes do not match", ToastAndroid.SHORT);
            code.current = "";
            setPasscode("");
          }
        } else if (code.current === storedPasscode) {
          router.push("/photos");
        } else {
          ToastAndroid.show("Wrong passcode", ToastAndroid.SHORT);
          code.current = "";
          setPasscode("");
        }
      }
    } else {
      code.current = "";
      setPasscode("");
    }
  };


  const handleDeletePress = () => {
    setPasscode(passcode.slice(0, -1));
    code.current = code.current.slice(0, -1);
  };

  const renderCircles = () => {
    const circles = [];
    for (let i = 0; i < 4; i++) {
      circles.push(
        <View key={i} style={styles.circle}>
          {i < passcode.length && <View style={styles.filledCircle} />}
        </View>
      );
    }
    return circles;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter passcode</Text>
      <View style={styles.circlesContainer}>{renderCircles()}</View>
      <View style={styles.numbersContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <TouchableOpacity
            key={number}
            style={styles.numberButton}
            onPress={() => handleNumberPress(number.toString())}
          >
            <Text style={styles.numberText}>{number}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.numberButton}>
          <Text>i</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.numberButton}
          onPress={() => handleNumberPress("0")}
        >
          <Text style={styles.numberText}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.numberButton}
          onPress={handleDeletePress}
        >
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2b2b",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  circlesContainer: {
    flexDirection: "row",
    marginBottom: 40,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  filledCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  numbersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "80%",
    justifyContent: "center",
  },
  numberButton: {
    width: "30%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 40,
    backgroundColor: "#424242",
  },
  numberText: {
    color: "white",
    fontSize: 32,
  },
});

