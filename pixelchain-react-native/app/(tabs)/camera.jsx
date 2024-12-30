// // import PhotoPreviewSection from '@/components/PhotoPreviewSection';
// import { AntDesign } from "@expo/vector-icons";
// import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
// import { useRef, useState } from "react";
// import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { uploadImageToServer } from "../../context/Services/photosSlice";
// import PhotoPreviewSection from "../../components/PhotoPreviewSection";

// export default function camera() {
//   const [facing, setFacing] = useState("back");
//   const [permission, requestPermission] = useCameraPermissions();
//   const [photo, setPhoto] = useState(null);
//   const cameraRef = useRef(null);

//   if (!permission) {
//     // Camera permissions are still loading.
//     return <View />;
//   }

//   if (!permission.granted) {
//     // Camera permissions are not granted yet.
//     return (
//       <View style={styles.container}>
//         <Text style={{ textAlign: "center" }}>
//           We need your permission to show the camera
//         </Text>
//         <Button onPress={requestPermission} title="grant permission" />
//       </View>
//     );
//   }

//   function toggleCameraFacing() {
//     setFacing((current) => (current === "back" ? "front" : "back"));
//   }

//   const handleTakePhoto = async () => {
//     if (cameraRef.current) {
//       const options = {
//         quality: 1,
//         base64: true,
//         exif: false,
//       };
//       const takedPhoto = await cameraRef.current.takePictureAsync(options);

//       setPhoto(takedPhoto);
//     }
//   };

//   const handleImageUpload = async () => {
//     if (photo) {
//       const fileUri = photo.uri; // The file URI
//       const fileType = "image/jpeg"; // Set the file type as appropriate
//       const fileName = fileUri.split("/").pop(); // Extract file name from URI
//       ///dispatch(uploadImageToServer(imageData.uri, imageData.mimeType, imageData.fileName));

//       console.log(fileUri, "fileUri");
//       console.log(fileType, "fileType");
//       console.log(fileName, "fileName");
//     }
//   };

//   const handleRetakePhoto = () => setPhoto(null);

//   if (photo)
//     return (
//       <PhotoPreviewSection
//         photo={photo}
//         handleRetakePhoto={handleRetakePhoto}
//         handleImageUpload={handleImageUpload}
//       />
//     );

//   return (
//     <View style={styles.container}>
//       <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//             <AntDesign name="retweet" size={44} color="black" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
//             <AntDesign name="camera" size={44} color="black" />
//           </TouchableOpacity>
//         </View>
//       </CameraView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: "row",
//     backgroundColor: "transparent",
//     margin: 64,
//   },
//   button: {
//     flex: 1,
//     alignSelf: "flex-end",
//     alignItems: "center",
//     marginHorizontal: 10,
//     backgroundColor: "gray",
//     borderRadius: 10,
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//   },
// });
