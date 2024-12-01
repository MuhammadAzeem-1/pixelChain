import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity , Modal, Button } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";


// Helper function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

// Helper function to convert bytes to MB
const formatSizeInMB = (sizeInBytes) => {
  return (sizeInBytes / (1024 * 1024)).toFixed(2); // Convert to MB with 2 decimal places
};

const Files = ({ files, loading }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);



  if(loading){
    return <Text>Loading...</Text>
  }

  return (
    <View className="mx-4">


      <FlatList
        data={files}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedFileUrl(item?.url)}>
            <View className="flex justify-start items-center flex-row gap-4 mb-2">
              <AntDesign name="pdffile1" size={15} color="black" />
              
              <View className="w-full truncate">
                <Text className="text-sm font-medium">{item?.Key}</Text>
                
                <View>
                  <Text className="text-xs font-light">Size: {formatSizeInMB(item?.Size)} MB</Text>
                  <Text className="text-xs font-light">Date: {formatDate(item?.LastModified)}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No files available.</Text>}
      />

      
    </View>
  );
};

export default Files;
