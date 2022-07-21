const { AuthenticationError, UserInputError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');


module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find({}).sort({ createdAt: -1 });
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },

        async getPost(_, { postId }) {
            try {
                const post = await Post.findOne({ _id: postId });
                if (post) {
                    return post;
                } else {
                    throw new Error("Post not found");
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },

    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context);

            if (body.trim() === '') {
                throw new Error('Post body must not be empty');
            }

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();

            return post;
        },

        async editPost(_, { postId, newBody }, context) {
            const { username } = checkAuth(context);

            if (newBody.trim() === '') {
                throw new Error('Post body must not be empty');
            }

            try {
                await Post.updateOne({_id: postId, username}, {body: newBody});
                return Post.findById(postId);
            } catch (err) {
                throw new Error(err);
            }
             
        },

        async deletePost(_, { postId }, context) {
            const { username } = checkAuth(context);

            try {
                await Post.deleteOne({_id: postId, username});
                return 'Post deleted successfully'    
            } catch (err) {
                throw new Error(err);
            }
        },

        async likePost(_, { postId }, context) {
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);

            if (post) {
                if (post.likes.find(likes => likes.username === username)) {
                    // Post already liked, unlike it
                    post.likes = post.likes.filter(likes => likes.username !== username);
                } else {
                    // Post not liked, like it
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString
                    })
                }
                await post.save()
                return post;
            } else throw new UserInputError("Post not found");
        }
    }
}