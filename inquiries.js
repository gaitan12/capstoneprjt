const {DataTypes} = require('sequelize');
const sequelize = require ('../config/database');


const Inquiries = sequelize.define('inquiries',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            
        },
       first_name:{
            type:DataTypes.STRING,
            allowNull:false,
    
        },

       last_name:{
            type:DataTypes.STRING,
            allowNull:false,
    
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
    
        },

        phone_number:{
            type:DataTypes.INTEGER,
            allowNull:false,
    
        },
        where_would_you_like_to_go:{
            type:DataTypes.STRING,
            allowNull:false,
    
        },
        when_would_you_like_to_depart:{
            type:DataTypes.DATE,
            allowNull:false,
    
        },
        when_would_you_like_to_return:{
            type:DataTypes.DATE,
            allowNull:false,
    
        },
        Are_your_dates_flexible:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
    
        },

        
        what_is_your_departure_city:{
            type:DataTypes.STRING,
            allowNull:false,
    
        },
        how_many_travelers:{
            type:DataTypes.INTEGER,
            allowNull:false,
    
        },
        if_traveling_with_children_less_than_18_please_list_their_ages:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        
        message:{
            type:DataTypes.STRING,
            allowNull:false,
        }





    }


);
module.exports = Inquiries;
