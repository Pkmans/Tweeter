const Profile = require('../../models/Profile');
const checkAuth = require('../../utils/check-auth');


module.exports = {
    Query: {
        async getProfile(_, { profileId }) {
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
        }
    }
}