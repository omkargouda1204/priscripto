import mongoose  from "mongoose";

// const doctorSchema =new mongoose.Schema({
    
//     name:{type:String,required:true},
//     email:{type:String,required:true,unique:true},
//     password:{type:String,required:true},
//     image:{type:String,required:true},
//     speciality:{type:String,required:true},
//     degree:{type:String,required:true},
//     experience:{type:String,required:true},
//     about:{type:String,required:true},
//     available:{type:Boolean,default:true},
//     fees:{type:Number,required:true},
//     address:{type:Object,required:true},
//     date:{type:Number,required:true},
//     slots_booked:{type:Object,default:{}}
// },{minimize:false})
const doctorSchema =new mongoose.Schema({
    
    name:{type:String,default:true},
    email:{type:String,default:true,unique:true},
    password:{type:String,default:true},
    image:{type:String,default:true},
    speciality:{type:String,default:true},
    degree:{type:String,default:true},
    experience:{type:String,default:true},
    about:{type:String,default:true},
    available:{type:Boolean,default:true},
    fees:{type:Number,default:true},
    address:{type:Object,default:true},
    date:{type:Number,default:true},
    slots_booked:{type:Object,default:{}}
},{minimize:false})

const doctorModel = mongoose.model.doctor || mongoose.model('doctor',doctorSchema)



export default doctorModel