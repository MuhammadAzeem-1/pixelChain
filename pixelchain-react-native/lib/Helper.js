import AsyncStorage from "@react-native-async-storage/async-storage";

// Helper function to get MIME type based on the file extension
export function getMimeType(fileName) {
    const extension = fileName.split(".").pop();
    switch (extension) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "pdf":
        return "application/pdf";
      case "docx":
        return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      default:
        return "application/octet-stream"; // Default MIME type if unknown
    }
  }
  
export async function getCredientaisl (key = "123") {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      // The value exists
      console.log("Retrieved value:--", data);
      return JSON.parse(data); // Parse if you stored JSON
    } else {
      console.log("No value found for the key:", key);
      return null;
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
} 




