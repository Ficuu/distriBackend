import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        
    }, 
    roles: [{
        ref: "Role",
        type: mongoose.Schema.Types.ObjectId
    }]
}, {
    timestamps: true, 
    versionKey: false
})

usersSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}


usersSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default mongoose.model('User', usersSchema)