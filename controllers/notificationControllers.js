import notification from "../models/notificationModel.js";
import {sendNotification} from "../utils/socket.js";

export const createNotification = async(req,res)=>{
    const {recipentId,senderId,type,postId,commentId} = req.body;

    try{
        if(!recipentId || postId && commentId){
            return res.status(404).json({message:"The post,the comment or the recipent is not found!"})
        }

        const newNotification = new notification({
            recipentId:recipentId,
            senderId:senderId,
            type,
            postId:postId,
            commentId:commentId
        })
        await newNotification.save();
        sendNotification(recipentId, newNotification);
        res.status(201).json({message:"notification Created",notfication:newNotification})
    }catch(error){
        res.status(500).json({message:"server error,Please Try Again!",error:error.message})
    }
}

export const markAsRead = async(req,res)=>{
    const {notificationId} = req.params
    try{

        const findNotification = await notification.findById(notificationId)
        if(!findNotification){
            return res.status(404).json({message:"Notifivcation not found!"})
        }

        notification.isRead = true
        await notification.save()
        res.status(200).json({message:"notification marked as read!"})
    }catch(error){
        res.status(500).json({message:"server error,Please try Again"})
    }
}


export const getNotification = async(req,res)=>{
    try{
        const notification = await notification.find({recipentId:req.user._id}).sort({createdAt:-1})
        res.status(200).json(notification)
    }catch(error){
        res.status(500).json({message:"server error,Please Try Again!"})
    }
}


export const clearNotification = async(req,res)=>{
    try{
        await notification.deleteMany({recipentId:req.user._id,isRead:true});
        res.status(200).json({message:"clear seen notification!"})
    }catch(error){
        res.status(500).json({message:"server error,Please try Again!"})
    }

}

export const unReadNotification = async(req,res)=>{
    try{
        const unread = await notification.find({
            recipent:req.user._id,
            isread:false
        }).sort({createdAt:-1});
        res.status(200).json({message:"This are nottification that are not readed!",unread:unread})
    }catch(error){
        res.status(500).json({message:"server error,Please Try Again",error:error.message})
    }
};