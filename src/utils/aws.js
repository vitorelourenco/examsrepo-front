import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function uploadToAWS(file) {
  const signatureResponse = await getAWSSignature(file);
  const {signedRequest, url} = signatureResponse.data;

  return uploadWithSignature(file, signedRequest, url);
}

function getAWSSignature(file) {
  return axios.get(
    `${BASE_URL}/sign-s3?file-name=${file.name}&file-type=${file.type}`
  );
}

async function uploadWithSignature(file, signedRequest, url) {
  const options = {
    headers: {
      "Content-Type": file.type,
    },
  };
  const uploadResponse = await axios.put(signedRequest, file, options);
  uploadResponse.data = uploadResponse.status === 200 ? { url: url } : { url: undefined };
  return uploadResponse;
}
