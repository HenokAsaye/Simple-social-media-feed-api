import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import Like from "../models/likeModel.js";


export const updateProfile = async(req,res)=>{
    const {username,email,bio} = req.body;
    let profilePicture = req.file ? req.file.filename : null;

    try{
        const updateFields = {username , email , bio};
        if(profilePicture){
            updateFields.profilePicture = profilePicture
        }

        const updateUser = await User.findOneAndUpdate(
            {id:req.user._id},
            {$set:updateFields},
            {new:true}
        );
        if(!updateUser){
            return res.status(404).json({message:"file not found"})
        }
        return res.status(200).json({message:"updated successfully",updateUser:updateUser})



    }catch(error){
        res.status(500).json({error:error})
    }
}


export const followUser = async (req, res) => {
    const { username } = req.body;  
    try {
      const userToFollow = await User.findOne({ username });
      if (!userToFollow) {
        return res.status(404).json({ message: "User to follow not found" });
      }
  
      
      const currentUser = await User.findById(req.user._id);
      if (!currentUser) {
        return res.status(401).json({ message: "You are not eligible for this service" });
      }
  
      
      if (currentUser.following.includes(userToFollow._id)) {
        return res.status(400).json({ message: "You are already following this user!" });
      }
  
      
      currentUser.following.push(userToFollow._id);
      await currentUser.save();
  
      
      userToFollow.followers.push(currentUser._id);
      await userToFollow.save();
  
      res.status(200).json({ message: `You have successfully followed ${username}` });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  export const unfollowUser = async (req, res) => {
    const { username } = req.body;
    try {
     
      const userToUnfollow = await User.findOne({ username });
      if (!userToUnfollow) {
        return res.status(404).json({ message: "User not found" });
      }
  
     
      const currentUser = await User.findById(req.user._id);
      if (!currentUser) {
        return res.status(401).json({ message: "You are not eligible for this service!" });
      }
  
      
      if (!currentUser.following.includes(userToUnfollow._id)) {
        return res.status(400).json({ message: `You are not following ${username}` });
      }
  
      
      currentUser.following = currentUser.following.filter(followingId => !followingId.equals(userToUnfollow._id));
      await currentUser.save();
  
     
      userToUnfollow.followers = userToUnfollow.followers.filter(followerId => !followerId.equals(currentUser._id));
      await userToUnfollow.save();
  
      res.status(200).json({ message: `You have successfully unfollowed ${username}` });
  
    } catch (error) {
      res.status(500).json({ message: "Please try again", error: error.message });
    }
  };
  
export const searchUser = async(req,res)=>{
    const {username} = req.query

    try{
        const findUser = await User.findOne({username:username});
        if(!findUser){
            return res.status(404).json({message:`There is not Account with username${username}`})
        };
        const postCount = await Post.countDocuments({user:findUser._id})
        const user = {
            username:username,
            followers:findUser.followers,
            following:findUser.following,
            postCount:postCount,
            bio:findUser.bio,
            profilePicture:findUser.profilePicture
        }
        res.status(200).json({user:user})
    }catch(error){
        res.status(500).json({message:"please try Again",error:error})
    }
}


export const getUserActivity = async(req,res) =>{
    try{
        const userId = req.user._id
        const userPost = await Post.find({user:userId})
        const userComments = await Comment.find({user:userId}).populate('post');
        const userLikes = await Like.find({user:userId}).populate('post');


        return res.status(200).json({
            posts:userPost,
            comments:userComments,
            likes:userLikes
        });

    }catch(error){
        res.status(500).json({message:"server error",error:error.message});
    }
}