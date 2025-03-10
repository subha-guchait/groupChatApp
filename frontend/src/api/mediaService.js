import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/media/`;

export const uploadMediaInGroup = async (selectedFile, groupId, options) => {
  if (!selectedFile) return null; // No file selected

  try {
    // Request pre-signed URL from backend

    const res = await axios.post(
      `${API_URL}/uploadmedia/${groupId}`,
      { fileName: selectedFile.name, contentType: selectedFile.type },
      {
        headers: { Authorization: localStorage.getItem("token") },
        signal: options.signal,
      }
    );

    const { url } = res.data;

    // Upload file to S3
    await axios.put(`${url}`, selectedFile, {
      headers: { "Content-Type": selectedFile.type },
      signal: options.signal,
    });

    return url.split("?")[0]; // Return clean S3 URL
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Failed to upload media");
  }
};
