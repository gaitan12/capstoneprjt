const {DataTypes} = require('sequelize');
const sequelize = require ('../config/database');


const Customer = sequelize.define('customers',
   
{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
   
    
},

{timestamps:false
}
);
module.exports = Customer;