const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            //! TODO: validate text between 1 and 280 characters
        },
        createdAt: {
            Date,
        },
    },
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;