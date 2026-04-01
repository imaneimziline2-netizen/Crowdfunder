import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true,
    },
    rol:{
    type:String,
    enum: ['project_owner', 'investor', 'admin'], 
    default: 'investor'
    },
    balance:{
        type: Number,
        default: 0
    }

},{ timestamps: true })

const user = mongoose.model("user", userSchema);

export default user;