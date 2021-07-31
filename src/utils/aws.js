import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export function getAWSSignature(file) {
  const url = new URL(`/sign-s3?file-name=${file.name}&file-type=${file.type}`,BASE_URL)
  return axios.get(url);
}

export async function uploadWithSignature(file, signedRequest, url) {
  const options = {
    headers: {
      "Content-Type": file.type,
    },
  };

  const uploadResponse = await axios.put(signedRequest, file, options);
  uploadResponse.data = uploadResponse.status === 200 ? { url: url } : { url: undefined };
  return uploadResponse;
}
