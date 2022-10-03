const { Schema , model } = require("mongoose");

const UserSchema = Schema({
    username: {
        type: String,
        require: [true , "The name is required"]
    },
    password: {
        type: String,
        require: [true, "The password is required"],
    },
    email: {
        type: String,
        require: [true, "The email is required"],
    },
    // trackerElements: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Element',
    // }]
});

UserSchema.methods.toJSON = function() {
    const { password, __v , ...user } = this.toObject();
    return user;
}

module.exports = model( "User", UserSchema );