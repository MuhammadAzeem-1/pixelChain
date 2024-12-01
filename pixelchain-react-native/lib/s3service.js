import AWS from "aws-sdk";

// Function to configure S3
export function configureS3({ accessKeyId, secretAccessKey, endpoint }) {
  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region: "us-east-1",
  });

  return new AWS.S3({
    endpoint,
    s3ForcePathStyle: true,
    signatureVersion: "v4",
  });
}
