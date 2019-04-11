module.exports = function(sequelize, Sequelize) {
 
    var photo = sequelize.define('photo', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        photographer: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        location: {
            type: Sequelize.STRING,
            notEmpty: true
        },
         
        
        settings: {
            type: Sequelize.STRING,
            allowNull: false
        },
 
       
 
 
    });
 
    return photo;
 
}