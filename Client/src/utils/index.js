import axios from "axios";
const API_URL = "https://recipe-share-pdlg.onrender.com/api/v1";

export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

export const apiRequest = async ({ url, token, data, method }) => {
  try {
    const result = await API(url, {
      method: method || "GET",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return result?.data;
  } catch (error) {
    const err = error.response.data;
    console.log(error);
    return { status: err.success, message: err.message };
  }
};

export const handleFileUpload = async (uploadFile) => {
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "hirego");
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dtcfxjepi/image/upload",
      formData
    );
    return response.data.secure_url;
  } catch (err) {
    console.log(err);
  }
};
