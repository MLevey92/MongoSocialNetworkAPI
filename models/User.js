const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //! DONE: match valid email address, using mongoose match validation
            validate: {
                validator: function(v) {
                    return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(v);
                },
                message: props => `${props.value} is not a valid email address`
            }

        },
        //! DONE?: thoughts and friends field, referencing Thought model and referencing User model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
);

const User = model('user', userSchema);

module.exports = User;