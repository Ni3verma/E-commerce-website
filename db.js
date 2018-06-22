const sequelize=require('sequelize')

const db=new sequelize('shopdb','nitin','system',{
    host:'localhost',
    dialect:'mysql',
    pool:{
        min:0,
        max:2
    }
})

const User=db.define('users',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:sequelize.STRING,
        allowNull:false
    },
    password:{
        type:sequelize.STRING,
        allowNull:false
    }
})

const Product=db.define('products',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:sequelize.STRING,
        allowNull:false,
        defaultValue:'Sample Name'
    },
    price:{
        type:sequelize.FLOAT,
        allowNull:false,
        defaultValue:0.0
    }
})

const Cart=db.define('cart',{
    uid:{
        type:sequelize.INTEGER,
        allowNull:false,
        defaultValue:-1
    },
    pid:{
        type:sequelize.INTEGER,
        allowNull:false,
        defaultValue:-1
    },
    count:{
        type:sequelize.INTEGER,
        allowNull:false,
        defaultValue:1
    }
})

db.sync().then(()=>console.log('database has been synced'))
.catch((error)=>console.log('error syncing the database'))
sy
exports=module.exports={
    User,Product,Cart
}