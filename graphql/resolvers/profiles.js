import Profile from '../../models/Profile.js';
import Post from '../../models/Post.js';
import User from '../../models/User.js';
import checkAuth from '../../utils/check-auth.js';

export default {
    Query: {
        async getProfileById(_, { profileId }) {
            try {
                const profile = await Profile.findOne({ _id: profileId });
                if (profile) {
                    return profile;
                } else {
                    throw new Error('Profile not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        },

        async getProfileByUsername(_, { username }) {
            try {
                const user = await User.findOne({username });
                const profile = await Profile.findOne({_id: user.profile})
                
                if (user) {
                    return profile;
                } else {
                    throw new Error('User not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        },

        async getStats(_, {username}) {
            try {
                const posts = await Post.find({});

                let [likeCount, commentCount, postCount] = [0, 0, 0];

                posts.forEach(post => {
                    if (post.username === username) 
                        postCount++;

                    post.likes.forEach(like => {
                        if (like.username === username) {
                            likeCount++;
                        }
                    })

                    post.comments.forEach(comment => {
                        if (comment.username === username)
                            commentCount++;
                    }) 
                });

                console.log({likeCount, commentCount, postCount});

                return {
                    likeCount,
                    commentCount,
                    postCount
                }

                // for each post: 
                //      -increase count if found a like with username
                //      -increase count if found comment with username
                //      -increase count if post is made by username

            } catch (err) {
                throw new Error(err);
            }
        }
    },

    Mutation: {
        async editProfile(_, {profileId, section, body}, context) {
            const { username } = checkAuth(context);

            try {
                await Profile.updateOne({_id: profileId, username}, {[section]: body});
                return Profile.findById(profileId);
            } catch (err) {
                throw new Error(err);
            }
        },

        async editMultipleProfile(_, {profileId, phone, email, birthDate}, context) {
            const { username } = checkAuth(context);

            try {
                await Profile.updateOne({_id: profileId, username}, {phone, email, birthDate});
                return Profile.findById(profileId);
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}