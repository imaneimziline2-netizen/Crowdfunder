import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema({
    amount: Number,
    investor: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    project: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project' 
    },
}, { timestamps: true });

const investment = mongoose.model('investment',investmentSchema);

export default investment