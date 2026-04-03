import mongoose  from "mongoose";

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    capitalGoal: {
        type: Number,
        required: true
    },
    capitalRaised: {
        type: Number,
        default: 0
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
        ref: 'User' 
    }
},{timestamps: true})

const projet = mongoose.model('projet',projectSchema);

export default projet;