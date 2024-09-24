import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    id:{
        type:Number,
        unique:true
    },
    content:{
        type:String,
        required:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    media:[{type:String}],
    likeCount:{
        type:Number,
        default:0
    },
    commentCount:{
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
    },
    tags:{
        type:String
    },
    Visiblity:{
        type:String,
        enum:['public','private','friends'],
        default:'public'
    }
})
const Post = mongoose.model("post",postSchema);
export default Post;