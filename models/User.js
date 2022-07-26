import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    createdAt: String,
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profiles'
    },
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Posts'}]
})

export default mongoose.model('User', userSchema);