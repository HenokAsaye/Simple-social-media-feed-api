import mongoose, { Schema } from "mongoose"


const commentSchema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    Author:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    post:{
        type:Schema.Types,ObjectId,
        ref:'Post',
        required:true
    },
    likeCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
})

const Comment = mongoose.model('Comment',commentSchema);
export default Comment;