import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import like from "../models/likeModel.js";



export const commentOnPost = async(req,res)=>{
    const {postId} = req.params
    const{comment} = req.body
    try{
        const findPost = await Post.findById(postId);
        if(!findPost){
            return res.status(404).json({message:"Post not found"})
        }
        const newComment = new Comment({
            comment:comment,
            user:req.user._id,
            comment
        })
        await newComment.save()
        Post.commentCount = (Post.commentCount || 0) + 1
        await Post.save()
        res.status(201).json({message:"commented on post successfully",comment})

    }catch(error){
        res.status(500).json({message:"server error,please Try Again",error:error.message})

    }
}

export const deleteComment = async(req,res)=>{
    const {postId}  = req.params;
    const {commentId} = req.query;
    
    try{
        const findPost = await Post.findById(postId);
        if(!findPost){
            return res.status(404).json({message:"Post not found"})
        }
        const findComment =  await Comment.findById(commentId);
        if(!findComment){
            return res.status(404).json({message:"Comment Not found"})
        }
        await Comment.deleteOne({comment:commentId,user:req.user._id})

        Post.commentCount = (Post.commentCount)-1
        await Post.save()
        res.status(200).json({message:"comment deleted successfully!",comment:commentId})


    }catch(error){
        res.tatus(500).json({message:"server error, Please try Again!",error:error.message})
    }

}

export const editComment = async(req,res)=>{
    const {postId} = req.params;
    const {commentId} = req.query;
    const {editedComment} = req.body;
    try{
        const findPost = await Post.findById(postId);
        if(!findPost){
            return res.status(404).json({message:"Post not found"})
        }
        const findComment =  await Comment.findById(commentId);
        if(!findComment){
            return res.status(404).json({message:"Comment Not found"})
        }
        const updatedComment = new Comment({
            Comment:editedComment,
            user:req.user._id,
            editedComment
        })
        await updatedComment.save();
        res.status(200).json({message:"Comment Edited Successfully!",comment:editedComment})
    }catch(error){
        res.status(500).json({message:"server error,Please Try Again",error:error.message})
    }
}

export const getComment = async(req,res)=>{
    const{postId} = req.params
    try{
        const findPost = await Post.findById(postId);
        if(!findPost){
            return res.status(404).json({message:"Post not found"})
        }

        const comment = await Comment.find({post:postId}).populate("user","username")

        if(comment.length === 0){
            return res.status(404).json({message:"no comment found on the Post",post:postId})
        }
        res.status(200).json({message:"All Comments are here!",comment:comment})
    }catch(error){
        res.status(500).json({message:"server error,Please Try Again!"})
    }
}