const User = require('../../db').User
const route = require('express').Router()

//returns user with username,password,if exists
route.get('/', (req, res) => {
    User.findAll(
        {
            where:
            {
                'name': req.query.username,
                'password': req.query.password
            }
        })
        .then((user) => {
            res.status(200).send(user)
        })
        .catch((err) => {
            res.status(500).send({
                error: 'could not retreive users'
            })
        })
})

route.post('/', (req, res) => {
    console.log('going to create user');

    User.findAll(
        {
            where:
            {
                'name': req.body.username,
                'password': req.body.password
            }
        })
        .then((user) => {
            if (user.length == 0) {//new unique user
                User.create({
                    name: req.body.username,
                    password: req.body.password
                }).then((newUser) => {
                    res.status(201).send(newUser)
                }).catch((err) => {
                    res.status(501).send({
                        error: 'could not add new user'
                    })
                })
            }
            else {//user already exists
                res.status(500).send({
                    error: 'user already exists'
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                error: 'could not retreive users'
            })
        })
})

exports = module.exports = route