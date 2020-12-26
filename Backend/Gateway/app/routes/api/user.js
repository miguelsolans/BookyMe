const express = require('express');
const router = express.Router();

// Services
const { Booking, Favorite, Review, Store, User } = require('../../services/User');

const { validator } = require('../../middlewares/checkBody');
const checkAuth = require('../../middlewares/checkAuth');


router.post('/register', validator([
    "name", "username", "email", "address", "city", "zipCode", "password"
]), (req, res) => {
    let body = JSON.stringify(req.body);

    User.register(body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.post('/login', validator([
    'email', 'password'
]), (req, res) => {
    let body = JSON.stringify(req.body);

    User.login(body)
        .then(response => {
            console.log(response);
            res.setHeader('Authorization', response.headers.get('authorization'));
            res.status(response.status).jsonp(response.data)
        }).catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.put('/account', checkAuth, validator([
    'name', 'address'
]), (req, res) => {
    let body = JSON.stringify(req.body);
    let token = req.headers.authorization || req.headers.Authorization;

    User.updateAccount(token, body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.patch('/password', checkAuth, validator([
    'oldPassword', 'newPassword'
]), (req, res) => {

    let body = JSON.stringify(req.body);
    let token = req.headers.authorization || req.headers.Authorization;

    User.updatePassword(token, body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

// Receives an array
router.get('/favorites', checkAuth, (req, res) => {
    let token = req.headers.authorization || req.headers.Authorization;

    Favorite.getFavorites(token)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.post('/favorite', checkAuth, validator([

]), (req, res) => {

});
module.exports = router;