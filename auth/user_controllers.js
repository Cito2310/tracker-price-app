// IMPORTS
const { isValidObjectId } = require("mongoose");

const User = require("./user_model");
const TrackerElement = require("../trackerCars/tracker_model");

// search users with name - public
const searchUsers = async(req , res) => {
    const { term } = req.params;
    const isMongoId = isValidObjectId(term);

    if (isMongoId) {
        const user = await User.findById(term);
        return res.json({ results: [user] });

    } else {
        const regex = RegExp(term, "i")
        const user = await User.find({
            $or: [{username: regex}, {email: regex}],
        })
        return res.json({ results: user });
    }
} 

const modifyUser = async(req, res) => {
    const user = req.USER;
    const {__v, _id, ...payload} = req.body;
    // update user
    const updateUser = await User.findByIdAndUpdate(user._id, payload, {new: true});
    // response
    res.json(updateUser);
}

const deleteUser = async(req, res) => {
    const user = req.USER;
    await User.findByIdAndRemove(user._id);
    
    const elementsArray = user.trackerElements

    const elementsDeletePromise = elementsArray.map(id => TrackerElement.findByIdAndDelete(id))
       
    await Promise.all(elementsDeletePromise)

    console.log(elementsArray, elementsDeletePromise)
    // response
    res.json({msg: "Delete user"});
}


module.exports = {
    searchUsers,
    modifyUser,
    deleteUser,
}