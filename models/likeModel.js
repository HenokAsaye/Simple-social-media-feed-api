import mongoose from "mongoose";

const likeScehma = mongoose.Schema({
    user:{
        type:Schema.Types.objectId,
        ref:'User'
    },
    post:{
        type:Schema.Types.objectId,
        ref:'Post'
    },
    comment:{
        type:Schema.Types.objectId,
        ref:'Comment'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const like = mongoose.model('like',likeScehma);

export default like;