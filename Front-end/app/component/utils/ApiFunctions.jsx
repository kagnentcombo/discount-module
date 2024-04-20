import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:8080",
});
export async function getAllStock() {
  try {
    const response = await api.get("stock/all-stock");
    return response.data;
  } catch (err) {
    throw new Error("Error fetching stock");
  }
}
export async function getAllCampaigns() {
  try {
    const response = await api.get("campaigns/all-campaigns");
    return response.data;
  } catch (err) {
    throw new Error("Error fetching campaigns");
  }
}
export const getAllCartItems = () => {
  return JSON.parse(localStorage.getItem("cartItems")) || [];
};
export async function sendCartItems(cartItems) {
  try {
    const response = await api.post("/campaigns/cartItem", cartItems);
	console.log("Successfully sent cartItems: ", response.data); 

    return response.data;
  } catch (error) {
    console.error("Error sending cartItems: ", error);
  }
}

export async function sendSelectCampaigns(campaign, cartItems) {
	try {
	  const response = await api.post("/campaigns/selectCampaigns", { campaign, cartItems });
  
	  console.log("Successfully sent campaign and cartItems: ", response.data); 
  
	  return response.data;
	} catch (error) {
	  console.error("Error sending campaign and cartItems: ", error);
	}
  }
  
