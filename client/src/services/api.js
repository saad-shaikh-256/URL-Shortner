export const shortenUrl = async (longUrl, customCode) => {
  try {
    const response = await API.post("/url/shorten", { longUrl, customCode });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong";
  }
};
