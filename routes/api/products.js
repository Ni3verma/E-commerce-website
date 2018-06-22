const Product=require('../../db').Product
const route=require('express').Router()

route.get('/',(req,res)=>{
    Product.findAll()
        .then((products)=>{
            res.status(200).send(products)
        })
        .catch((error)=>{
            res.status(500).send({error:'could not retreive products'})
        })
})

route.post('/',(req,res)=>{

    if(isNaN(req.body.price)){
        return res.status(403).send({
            error:'price is not a valid number'
        })
    }

    Product.create({
        name:req.body.name,
        price:parseFloat(req.body.price)
    }).then((product)=>{
        res.status(201).send(product)
    }).catch((error)=>{
        res.status(501).send({
            error:'error adding product'
        })
    })
})

route.get('/getProductWithId',(req,res)=>{
    let pid=req.query.prodId

    Product.findAll(
        {
            where:
            {
                'id': pid
            }
        }
    )
        .then((product)=>{
            res.status(200).send(product)
        })
        .catch((error)=>{
            res.status(500).send({error:'could not retreive products'})
        })
})

exports=module.exports=route