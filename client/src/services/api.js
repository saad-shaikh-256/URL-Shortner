import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000, // 5 second timeout
});

export const shortenUrl = async (longUrl, customCode) => {
  try {
    const response = await API.post("/url/shorten", { longUrl, customCode });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message || "Server Error";
    } else if (error.request) {
      throw "Server unreachable. Is the backend running on port 5000?";
    } else {
      throw "Request failed. Check your internet connection.";
    }
  }
};
