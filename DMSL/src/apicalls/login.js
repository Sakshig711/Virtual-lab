import axiosInstance from "./axios";

export const LoginAdmin=async(payload)=>{
    try{
        const response=await axiosInstance.post('/api/login',payload);
        return response.data;
    }catch(err){
        return err.response.data;
    }
}


export const registerUser=async(payload)=>{
    try{
        console.log("Sending Request:", payload); 
        const response = await axiosInstance.post("/api/register", payload);
        console.log("Response:", response.data);
        return response.data;
    }catch(err){
        return err.response.data;
    }
}