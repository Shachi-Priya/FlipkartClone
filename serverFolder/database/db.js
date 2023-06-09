import mongoose from "mongoose";

const Connection=async(URL)=>{
    try{      
        await mongoose.connect(URL, {useUnifiedTopology:true, useNewUrlParser:true});
        console.log("Database connected successfully.");
    }
    catch(err){
        console.log("Error while connecting with the database", err.message);
    }
}

export default Connection; 