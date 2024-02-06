const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
    //get all users
    async getUsers (req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //get single user by ID
    async getUser (req, res) {
        try {
            //! TODO: populate friends and thoughts
            const user = await User.findOne({ _id: req.params.userId });
            return res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //create a user
    async createUser (req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //add friend by id
    async addFriend (req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId}},
                { new: true },
            );

            //! TODO: make sure the friend exists before you add them

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    //delete friend by id
    async deleteFriend (req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { new: true },
            );

            //! TODO: make sure the friend is in the friends list before you delete

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}