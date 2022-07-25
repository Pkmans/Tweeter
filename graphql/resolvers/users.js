const { UserInputError } = require("apollo-server");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');
const { SECRET_KEY } = require('../../config');

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        profile: user.profile.toString()
    }, SECRET_KEY, { expiresIn: "1h" })
}

module.exports = {
    Query: {
        async getProfile(_, { profileId }) {
            console.log('get profile query called');
            try {
                const profile = await Profile.findOne({ _id: profileId });
                console.log(profile);
                if (profile) {
                    return profile;
                } else {
                    throw new Error('Profile not found');
                }
            } catch(err) {
                throw new Error(err);
            }
        }
    },

    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError("Errors", { errors });
            }

            const user = await User.findOne({ username: username });
            if (!user) {
                errors.general = "User not found";
                throw new UserInputError("User not found", { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = "Incorrect password"
                throw new UserInputError("Incorrect password", { errors });
            }

            const token = generateToken(user);

            // console.log(user.profile.toString());

            return {
                ...user._doc,
                id: user._id,
                token
            }

        },

        async register(_, { registerInput: { username, email, password, confirmPassword } }) {
            // Validate user data
            const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword);

            if (!valid) {
                throw new UserInputError("Errors", { errors });
            }

            // Make sure user doesn't already exist
            const user = await User.findOne({ username: username });
            if (user) {
                throw new UserInputError("Username is taken", {
                    errors: {
                        username: "This username is taken"
                    }
                });
            }

            /* CREATE PROFILE */

            const newProfile = new Profile({
                username,
                email,
                phone: '',
                school: '',
                location: '',
                bio: '',
                birthDate: ''
            })

            const profile = await newProfile.save();

            // Hash password and create an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                email,
                password,
                createdAt: new Date().toISOString(),
                profile: profile._id
            });

            const res = await newUser.save();
            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}