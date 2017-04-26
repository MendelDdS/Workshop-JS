var express = require('express');
var router = express.Router();

var User = require("../models/user");

var busboy = require('connect-busboy');



var code404 = 404;

/**
* Get users (GET)
*/

router.get('/users', function (req, res) {

    
    User.find(function (err, user) {
        if (err) return console.error(err);
        res.send(user);
    });
    
});

/**
* Create user
*/

router.post('/user', function (req, res) {
    
    var user = new User(req.body);
    user.save(function (err, next) {
        if (err) {
            return next(err);
        }
        res.end()
    });
    
});

/**
* Edit User
*/

router.put('/user/:id', function (req, res) {
    
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, doc) {
        if (err) console.log(err);
        console.log("Usuário atualizado!");
        res.send(doc);
    });
    
});


/**
* Return USER
*/

router.post('/user/:id', function (req, res, next) {

    var user = req.params.id;
    User.findOne({_id: user}, function (err, result) {
        if (err) {
            res.sendStatus(code404);
            return next(err);
        }

        res.send(result);
    });
});

/**
* Delete USER
*/

router.delete('/user/:id', function (req, res, next) {
    
    User.remove({
        _id: req.params.id
    }, function (err) {
        if (err) {
            res.sendStatus(404);

            return next(err);
        }
        res.end();
        console.log('deletou');
        return next();
    });
    
});

router.param('user', function (req, res, next, _id) {
    var query = User.findById(_id);

    query.exec(function (err, user) {
        if (err) {
            res.sendStatus(code404);
            return next(err);
        }
        if (!user) {
            res.sendStatus(code404);
            return next(new Error('can\'t find user'));
        }

        req.user = user;
        return next();
    });
});



module.exports = router;
