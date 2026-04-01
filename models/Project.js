import mongoose  from "mongoose";

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    capital:{
        type:Number
    },
    status: { 
        type: String, enum: ['open', 'closed'],
        default: 'open' 
    },
    maxInvestmentPercent: {
        type: Number,
        default: 50 
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    }
},{timestamps: true})

const projet = mongoose.model('projet',projectSchema);

export default projet;