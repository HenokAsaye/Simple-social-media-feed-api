import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import like from "../models/likeModel.js";
import { addImage } from "../middlewares/multerMiddleware.js";

export const createPost = async (req,res)=>{
    const {content,tag} =req.body;
    const addImage = req.file ? req.file.filename : null;
    try{
        if(!content && !addImage){
            res.status(403).json({message:"content or image is required to post this post"})
        }
        const newPost = {
            constent:content || '',
            addImage:addImage ? [addImage]:[],
            tag:tag || '',
            user:req.user._id
        };
        await newPost.save()
        return res.status(201).json({message:"post created successfully",post:newPost});
    }catch(error){
        res.status(500).json({message:"server-error",error:error.message})
    };

};

export const editPost = async(req,res)=>{
    const {postId}  =req.params
    const {content,tag} =req.body;
    const addImage = req.file ? req.file.filename : null;
    try{
        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({message:"post not found"})
        }
        if(post.author.toString() !== req.user._id){
            return res.status(403).json({message:"Unauthorized to edit this post"});
        };
        if(content){
            post.content = content;
        }
        if(tag){
            post.tag = tag;
        }
        if(addImage){
            post.media.push(addImage);
        }
        await post.save();
        return res.status(200).json({message:"post updated successfully",post:post})
    }catch(error){
        res.status(500).json({message:"server-error",error:error.message})
    };
}

export const deletePost = async(req,res)=>{
    const {postId} = req.params
    try{
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message:"Poast not found!"})
        }
        if(Post.author.toString() !== req.user._id){
            return res.status(403).json({message:"Unauthorized to delete this post!"})
        };
        await Post.findByIdAndDelete(postId)


        await User.findByIdAndUpdate(req.user._id,{$inc:{postCount:-1}});
        return res.status(200).json({message:"Deleted successfully!",})
    }catch(error){
        res.status(500).json({message:"server-error",error:error.message});
    }
};

export const searchTag = async(req,res)=>{
    const {tag} = req.params
    try{
        const findPost = await Post.find({tags:{$regex:tag,$options:i}});
        if(!findPost  || findPost.length == 0){
            return res.status(404).json({message:`There is not posts with this${tag}`})
        };
        res.status(200).json({findPost:findPost});
    }catch(error){
        res.status(500).json({messgage:"server-error",error:error.message})
    }
};

export const getFollowingPosts = async(req,res)=>{
    const currentUser = req.user._id;

    try{
        const user = await findById(currentUser).populate('following');

        if(!user.following || user.following.length === 0){
            return res.status(404).json({message:"you are not following anyone!"});
        };

        const followingIds = user.following.map(followingUser => followingUser._id);
        const posts = await Post.find({author:{$in:followingIds}}).sort({createdAt:-1});

        res.status(200).json({posts})
        }catch(error){
            res.status(500).json({message:"server-error",error:error.message})
        }


};
export const likePost = async (req,res)=>{
    const {postId} = req.params;
    try{
        const post = await findById(postId);
        if(!post){
            return res.status(404).json({message:"post not found"});
        };

        const likeExists = await like.findOne({post:postId , user:req.user._id});
        if(likeExists){
            return res.status(400).json({message:"you have already like this post!"});

        }

        const newLike = new like({
            post:postId,
            user:req.user._id
        })
        await newLike.save();

        post.likeCount +=1;
        await post.save();

        res.status(200).json({message:'post Liked Successfullty',post})

    }catch(error){
        res.status(500).json({messsge:"server-error",error:error.message})
    }
};


export const commentOnPOst = async (req,res)=>{
    const {postId} = req.params
    const {comment} = req.body

    try{
        const posts =await Post.findById(postId);

        if(!posts){
            return res.status(404).json({message:"post not found!"})
        }
        const newComment =new Comment({
            Comment:Comment,
            user:req.user._id,
            comment
        })
        await newComment.save();

        Post.commentCount +=1;
        await Post.save();

        res.status(201).json({message:"Comment added successfully",posts})


    }catch(error){
        res.status(500).json({message:"server-error",error:error.message})
    }
}


