import axios from "axios";

export const RegisterUser = async (payload) => {
  try {
    const response = await axios.post("/api/users/register", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const LoginUser = async (payload) => {
  try {
    const response = await axios.post("/api/users/login", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetUserInfo = async () => {
  try {
    const response = await axios.get("/api/users/get-user-info");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};