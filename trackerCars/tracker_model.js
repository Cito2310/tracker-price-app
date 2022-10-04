const { Schema , model } = require("mongoose");

const TrackerSchema = Schema({
    title: {
        type: String,
        require: [true , "The title is required"]
    },
    price: {
        type: String,
        require: [true, "The password is required"],
    },
    symbolPrice: {
        type: String,
        require: [true, "The symbol price is required"],
    },
    model: {
        type: String,
        require: [true, "The model is required"],
    },
    km: {
        type: String,
        require: [true, "The km is required"],
    },
    link: {
        type: String,
        require: [true, "The link href is required"]
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: [true, "The user id  is required"],
    }
});

TrackerSchema.methods.toJSON = function() {
    const { __v , ...user } = this.toObject();
    return user;
}

module.exports = model( "TrackerElement", TrackerSchema );