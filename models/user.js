import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            requiured: true,
            unique: true
        },
        password: String,
        phone: {
            type: String,
            default: "Not given"
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            default: "user"
        },
        isEmailVerified: {
            type:Boolean,
            default: false
        },
        image: {
            type: String,
            default: "https://png.pngtree.com/png-vector/20190501/ourmid/pngtree-users-icon-design-png-image_1014936.jpg"
        }
    }
)

const User = mongoose.model("users",userSchema )

export default User