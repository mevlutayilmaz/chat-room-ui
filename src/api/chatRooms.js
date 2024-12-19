import api from "./axiosConfig";

export const getAllChats = async () => {
  try {
    const response = await api.get("/chatRooms/getAllChats", { requiresAuth: true });
    return response.data;
  } catch (error) {
    console.error('API isteği başarısız:', error);  
  }
}

export const createDirectChat = async (username) => {
  try {
    await api.post("/chatRooms/CreateDirectChat", null, { params: { username }, requiresAuth: true , successMessage: `'${username}' takma isimli kullanıcı ile DirectChatRoom başarılı bir şekilde oluşturuldu!` });
  } catch (error) {
    console.error('API isteği başarısız:', error);  
  }
}

export const createGroupChat = async (name, imageUrl, usernameList) => {
  try {
    await api.post("/chatRooms/CreateGroupChat", usernameList, { params : { name, imageUrl }, requiresAuth: true, successMessage: `'${name}' isimli GroupChatRoom başarılı bir şekilde oluşturuldu!` });
  } catch (error) {
    console.error('API isteği başarısız:', error);  
  }
}