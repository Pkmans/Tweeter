import Profile from '../../models/Profile.js';
import checkAuth from '../../utils/check-auth.js';

export default {
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