import api from "./axiosConfig";

export const getAllUsers = async () => {
  try {
    const response = await api.get("/users/getAllUsers", { requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);  
  }
}

export const getUserOnlineStatus = async (chatRoomId) => {
  try {
    const response = await api.get(`/users/getUserOnlineStatus/${chatRoomId}`, { requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);  
  }
}