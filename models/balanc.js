import mongoose  from "mongoose";

const balancSchema = new mongoose.Schema({
    amount :{
        default: 0
    }
}) 