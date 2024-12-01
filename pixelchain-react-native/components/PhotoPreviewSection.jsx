import { Fontisto } from '@expo/vector-icons';
import { CameraCapturedPicture } from 'expo-camera';
import React from 'react'
import { TouchableOpacity, SafeAreaView, Image, StyleSheet, View,Text} from 'react-native';

const PhotoPreviewSection = ({
    photo,
    handleRetakePhoto,
    handleImageUpload
}) => (
    <SafeAreaView style={styles.container}>
        <View style={styles.box}>
            <TouchableOpacity onPress={handleImageUpload} className="py-2 px-8 bg-[#2897FF] text-white rounded-xl mb-2 ">
                <Text className="text-white font-medium text-sm">Upload</Text>
            </TouchableOpacity>
            <Image
                style={styles.previewConatiner}
                source={{uri: 'data:image/jpg;base64,' + photo.base64}}
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
                <Fontisto name='trash' size={36} color='black' />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        borderRadius: 15,
        padding: 1,
        width: '95%',
        backgroundColor: 'darkgray',
        justifyContent: 'center',
        alignItems: "center",
    },
    previewConatiner: {
        width: '85%',
        height: '75%',
        borderRadius: 15
    },
    buttonContainer: {
        marginTop: '1%',
        marginBottom: '20%',
        flexDirection: 'row',
        justifyContent: "center",
        width: '100%',
    },
    button: {
        backgroundColor: 'gray',
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }

});

export default PhotoPreviewSection;