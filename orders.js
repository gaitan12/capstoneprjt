const {DataTypes} = require('sequelize');
const sequelize = require ('../config/database');
const Customers = require('./customers');



const Orders = sequelize.define('order',

{
    
        id:{
            type:DataTypes.STRING,
            autoIncrement:true,
            primaryKey:true
        },
        orders_date:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        customer_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Customers,
                key: 'id',
            },

        },
    
},

{timestamps: false}


);

Orders.belongsTo(Customers, { foreignKey: 'customer_id', as: 'customer'});
Customers.hasMany(Orders, {foreignKey: 'customer_id', as: 'Orders'});

module.exports = Orders;