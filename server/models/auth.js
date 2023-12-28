import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true,'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false,
    },
    avatar:{
        public_id:{type:String,default:""},
        url:{type:String,default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
    },
    about:{type:String},
    tags:[{type:String}],
    friend:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    verified:{type:Boolean,default:false},
    joinedOn: {type: Date,default: Date.now},
})

export default mongoose.model("User",userSchema)