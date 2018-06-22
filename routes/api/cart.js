const Cart = require('../../db').Cart
const route = require('express').Router()

route.get('/addToCart', (req, res) => {
    let uid = req.query.uid
    let pid = req.query.pid
    Cart.findAll(
        {
            where:
            {
                'uid': uid,
                'pid': pid
            }
        })
        .then((cartRow) => {
            //console.log(cartRow);

            if (cartRow.length == 0) {  //new row
                Cart.create({
                    uid: uid,
                    pid: pid,
                    count: 1
                }).then((newItem) => {
                    res.status(201).send(newItem)
                }).catch((err) => {
                    res.status(501).send({
                        error: 'could not add new item'
                    })
                })
            }
            else {  //increment the value of count
                Cart.update(
                    { count: cartRow[0].count + 1 },
                    {
                        returning: true,
                        where: { uid: uid, pid: pid }
                    }
                )
                    .then(result => {
                        res.status(200).send(cartRow[0].count + 1 + '')
                    })
                    .catch(err => {
                        res.status(501).send({
                            error: 'could not add new item'
                        })
                    })
            }
        })
        .catch((er) => {
            res.status(500).send({
                error: 'could not retreive cart'
            })
        })
})

route.get('/getPid', (req, res) => {
    let uid = req.query.userid
    
    Cart.findAll({ where: { 'uid': uid } })
        .then((list) => {
            res.status(200).send(list)
        })
        .catch((er) => {
            res.status(500).send({
                error: 'could not retreive pid'
            })
        })
})


exports = module.exports = route