import axios from "axios";

export const getCoinData = async (id) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    return response.data;
  } catch (error) {
    console.error("ERROR fetching coin data >>>", error);
    return null; // Return null to handle error gracefully
  }
};
