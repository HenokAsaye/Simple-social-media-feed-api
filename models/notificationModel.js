import mongoose, { Schema } from "mongoose";

const notificationSchema = mongoose.Schema({
    recipent:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    sender:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    type:{
        type:String,
        enum:['like','comment','share'],

    },
    post:{
        type:Schema.Types.ObjectId,
        ref:'Post'
    },
    Comment:{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    },
    isRead:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const notification = mongoose.model('notification',notificationSchema);
export default notification;