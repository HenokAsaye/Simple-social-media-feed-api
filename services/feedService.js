import User from "../models/userModel.js";
import Post from "../models/postModel.js"


export const feedUser = async (userId , page=1 , limit=10)=>{
    try{
        const user = await User.findById(userId).populate("following");
        if(!userfollowing || User.userfollowing.length == 0){
            throw new Error("You re not following Anyone!")
        }
        const followingIds = user.following.Map(followingUser => followingUser._id)
        const post = await Post.find({author:{$in:followingIds}})
            .sort({createdAt:-1})
            .skip((page -1) * limit)
            .limit(limit)
        return post
    }catch(error){
        throw new Error("unknown error occuring!")
    }
}