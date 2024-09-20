import User from "../models/userModel.js";


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

export const followUser = async(req,res)=>{
    const {username } = req.body;
    try{
        const usertofollow = await User.findOne(username);
        if(!usertofollow){
            return res.status(404).json({message:"user not found"})
        }
        const currentUser = await User.findOne(req.user._id);
        if(!currentUser){
            return res.status(401).json({message:"you are not eligable for this service"})
        };
        if(currentUser.following.includes(usertofollow)){
            return res.status(400).json({message:"you are already follow this user!"})
        }
        currentUser.following.push(usertofollow);
        await currentUser.save();
        usertofollow.followers.push(currentUser._id);
        await usertofollow.save();

        res.status(200).json({message:`you have sucessfully follow ${usertofollow}`})

    }catch(error){
        res.status(500).json({error:error});
    }
}




export const unfollowUser = async(req,res)=>{
    const {username} = req.body;
    try{
        const usertoBeunfollowed = await User.findOne(username);
        if(!usertoBeunfollowed){
            return res.status(404).json({message:"user not found"})
        }
        const currentUser = await findOne(req.user._id);
        if(!currentUser){
            return res.status(401).json({message:"you are not eligable for this service!"});
        }

        if(!currentUser.following.includes(username)){
            return res.status(400).json({message:`you are not following ${username}`})
        }
        currentUser.following.splice(username,1)
        await currentUser.save();

        usertoBeunfollowed.followers.splice(currentUser,1);
        await usertoBeunfollowed.save();

        res.status(200).json({message:`you have successfully unfollow${username}`})


    }catch(error){
        res.status(500).json({message:"Please try again"})
    }
}