const{DataTypes}= require('sequelize');
const sequelize= require('../config/database');
const   Orders = require('./orders');


const Packages = sequelize.define('package',
    {
       id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
      category:{
        type:DataTypes.STRING,
        allowNull:false
       },
       price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
        destination:{
        type:DataTypes.STRING,
        allowNull:false
    },
        description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image: {
      type: DataTypes.BLOB('long'), // for large images
      allowNull: true,
    },
    

        orderid:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
              model:Orders,
              key: 'id',
            },
        },
      

       
    
    },
    
    {
        timestamps: false, // Automatically include createdAt and updatedAt fields
      }
    
    );
 Packages.belongsTo(Orders, { foreignKey: 'orderid', as: 'order'});
 Orders.hasMany(Packages, { foreignKey: 'orderid', as: 'Packages'});






module.exports = Packages;
