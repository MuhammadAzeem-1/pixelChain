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
  
