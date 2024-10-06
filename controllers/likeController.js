import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import Like from "../models/likeModel.js";


export const likePost = async(req,res)=>{
  try{
       const {postId} = req.params
       const findPost = await Post.findById(postId);
        if(!findPost){
            return res.ststus(404).json({message:"Post is not found"})
        }

        const likeExists = await Like.findOne({post:postId,user:req.user._id});

        if(likeExists){
            return res.status(400).json({message:"you have already liked this post!"})
        }
        const newLike = new Like({
            post:postId,
            user:req.user._id
        });
        await newLike.save();
        findPost.likeCount = (findPost.likeCount || 0) +1
        await findPost.save();

        res.status(200).json({message:'post Liked successfully!',Post})
    }catch(error){
        res.status(500).json({message:"server-error,Please Try Again",error:error.message})
    }
}


export const unlikePost = async(req,res)=>{
    const{postId} = req.params
    try{
        const findPost = await Post.findById(postId)
        if(!findPost){
            return res.status(404).json({message:`There is no post with id${postId}`})
        }

        const liked = await Like.findOne({post:postId})
        

        if(!liked || liked.length==0){
            return res.status(400).json({message:"you didn't like The post before!"})
        }

        await Like.deleteOne({post:postId,user:req.user._id})
        findPost.likeCount = (findPost.likeCount)-1
        await findPost.save();
        return res.status(200).json({message:"Post Unliked Successfully!"})
        
    }catch(error){
        res.status(500).json({message:"server error,Please try Again!",error:error.message});
    }
}


export const LikeComment  = async(req,res)=>{
    const{commentId} =req.params
    try{
        const foundComment = await Comment.findById(commentId)
        if(!foundComment){
            return res.status(404).json({message:"comment not found!"})
        }
        const likeExists = await Like.findOne({comment:commentId,user:req.user._id})
        if(likeExists){
            return res.status(400).json({message:"you have already liked this comment!"})
        }
        const newLike = new Like({
            comment:commentId,
            user:req.user._id
        });
        await newLike.save();
        foundComment.likeCount = (Comment.likeCount || 0)+1
        await foundComment.save();
        res.status(200).json({message:"comment Liked successfully!"})
    }catch(error){
        res.status(500).json({message:"server error,Please Try Again!",error:error.message})
    }
}

export const UnlikeComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        const findComment = await Comment.findById(commentId);
        if (!findComment) {
            return res.status(404).json({ message: "Comment not found!" });
        }

        const liked = await Like.findOne({ comment: commentId, user: req.user._id });
        console.log(liked);
        if (!liked) {
            return res.status(400).json({ message: "You haven't liked the comment before!" });
        }

        await Like.deleteOne({ comment: commentId, user: req.user._id });

        findComment.likeCount = Math.max(0, findComment.likeCount - 1);
        await findComment.save();

        res.status(200).json({ message: "Comment unliked successfully", comment: findComment });
    } catch (error) {
        res.status(500).json({ message: "Server error, please try again!", error: error.message });
    }
};


export const likeForPost = async(req,res)=>{
    const {postId} =req.params
    try{
        const findPost = await Post.findById(postId)
        if(!findPost){
            return res.status(404).json({message:"post not found!"})
        }
        const likes = await Like.find({post:postId}).populate("user","username",)
        res.status(200).json(likes)
    }catch(error){
        res.status(500).json({message:"server error,Please Try Again!",error:error.message})
    }
}

export const likeForComment = async(req,res)=>{
    const {commentId} = req.params
    try{
        const findComment = await Comment.findById(commentId)
        if(!findComment){
            return res.status(404).json({message:"Comment not Found!"})
        }

        const likes = await Like.find({comment:commentId}).populate("user","username")
        res.status(200).json(likes);
    }catch(error){
        res.status(500).json({message:"server error,please Try Again!",error:error.message})
    }
}