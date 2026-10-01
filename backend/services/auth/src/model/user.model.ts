import mongoose, { Document } from "mongoose";
import { type } from "node:os";

interface IPartnerprofile {
  slug?: string;
  bio?: string;
  website?: string;
  socialLinks?: ISocialLinks;
}
interface ISocialLinks {
  youtube?: string;
  linkdin?: string;
  instagram?: string;
  github?: string;

}
interface IPaymentdetails {
  method: "upi" | "bank",
  upiId?: string,
  accountHolderName?: string,
  accountNumber?: string,
  ifscCode?: string;

}


export interface IUser extends Document {
  firebaseUid: String,
  name: String,
  email: string,
  role: "partner" | "admin",
  patnerProfile: IPartnerprofile,
  paymentDetails: IPaymentdetails,
  totalSales: number,
  toatalrevenue:number,
  isActive: boolean,
  createdAt: Date;
  updateAt: Date;
}
const userSchema = new mongoose.Schema<IUser>({
  firebaseUid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
    lowercase: true
  }, role: {
    type: String,
    enum: ["partner", "admin"],
    default: "partner",
    index: true,

  },
  patnerProfile: {
    slug: {
      type: String,
      unique: true,
      index: true
    },
    bio: {
      type: String,
      default: " ",
    },
    website: {
      type: String,
      default: "",
    },
    socialLinks: {
      youtube: {
        type: String,
        default: "",
      },
      linkdin: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
    }

  },
  paymentDetails: {
    method: {
      type: String,
      enum: ["upi", "bank"],
      default: "upi",
    },
    upiid: {
      type: String,
      default: "",
    },
    accountHolderName: {
      type: String,
      default: "",
    },
    accountNumber: {
      type: String,
      default: "",

    },
    ifscCode: {
       type: String,
      default: "",

    }

  },
  totalSales:{
     type:Number,
      default:0,
      min:0
  },
  toatalrevenue:{
     type:Number,
      default:0,
      min:0
  },
  isActive:{
    type:Boolean,
    default:true,
  }



}, { timestamps: true })

const User =mongoose.model("user",userSchema)
export default User
