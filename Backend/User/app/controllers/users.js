const User = require('../models/user');


module.exports.createUser = ({name, username, email, address, city,zipCode, password, type}) => {
    const user = new User({name : name, username: username, address : address, city: city, zipCode: zipCode, email: email, password : password, type: type});

    return user.save();
}

module.exports.searchWithEmailOrUsername = (emailOrUsername) =>{
    return User.findOne({$or: [{email: emailOrUsername}, {username: emailOrUsername}]});
}

module.exports.updateInfo = (user,id) => {
    return User.findByIdAndUpdate(id,user,{new:true});
}

module.exports.updatePhoto = (id, url) => {
    return User.findByIdAndUpdate(id, {avatar: url}, {new: true});
}

module.exports.updatePassword = (id, password) => {
    return User.findByIdAndUpdate(id, {password: password}, {new: true});
}

module.exports.addFavorite = (id, favorite) =>{
    return User.findByIdAndUpdate(id, {$addToSet: {favorites: favorite}}, {new: true});
}

module.exports.addReview = (id, review) =>{
    return User.findByIdAndUpdate(id, {$addToSet: {reviews: review}}, {new: true});
}

module.exports.addBooking = (id, booking) =>{
    return User.findByIdAndUpdate(id, {$addToSet: {bookings: booking}}, {new: true});
}

module.exports.addStore = (id, store) =>{
    return User.findByIdAndUpdate(id, {$addToSet: {stores: store}}, {new: true});
}

module.exports.findById = (id) => {
    return User.findById(id);
}

module.exports.findUserStore = (id, storeId) => {
    return User.findById(id, {stores: storeId});
}

module.exports.deleteAll = () => {
    return User.deleteMany();
}

module.exports.getUsers = () => {
    return User.find();
}