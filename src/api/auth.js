import api from "./axiosConfig";

export const login = async (usernameOrEmail, password) => {
  try {
    return await api.post("/auth/login", { usernameOrEmail, password });
  } catch (error) {
    console.error('API isteği başarısız:', error);  
  }
}

export const signup = async (nameSurname, username, email, imageUrl, password) => {
  try {
    await api.post("/auth/register", { nameSurname, username, email, imageUrl, password }, { successMessage: 'Kayıt başarılı! Bilgilerinizle giriş yapabilirsiniz.' }); 
  } catch (error) {
    console.error('API isteği başarısız:', error);
  }
}