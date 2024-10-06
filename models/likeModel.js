import mongoose,{Schema} from "mongoose";

const likeScehma = mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:'Post'
    },
    comment:{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const Like = mongoose.model('Like',likeScehma);

export default Like;