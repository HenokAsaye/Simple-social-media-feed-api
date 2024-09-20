import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },                    
  bio: { type: String },                                
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  postsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  isVerified: { type: Boolean, default: false },
  lastLogin: { type: Date },
  notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }]
});
 

const User = mongoose.model("user",userSchema)
export default User;