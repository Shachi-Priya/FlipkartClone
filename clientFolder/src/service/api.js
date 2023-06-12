import axios from "axios";


const URL="https://flipkart-klone.onrender.com";

export const authenticateSignup=async(data)=>{
    try{
        return await axios.post(`${URL}/signup`, data);
    }catch(err){
        console.log("Error while calling signup api ", err.message);
    }
}

export const authenticateLogin=async(data)=>{
    try{
        return await axios.post(`${URL}/login`, data);
    }catch(err){
        console.log("Error while calling login api ", err.message);
        return err.response;
    }
}

export const payUsingPaytm=async(data)=>{
    try{
        let response=await axios.post(`${URL}/payment`, data);
        return response.data;
    }catch(err){
        console.log("Error while calling paying api ", err);
    }
}