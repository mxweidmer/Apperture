module.exports = function (sequelize, Sequelize) {

    var User = sequelize.define('user', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
<<<<<<< HEAD

        username: {
            type: Sequelize.TEXT
        },

        about: {
            type: Sequelize.TEXT
        },

=======
         
>>>>>>> a960d0f87dd066ba69040d033db0f93bb141f753
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
<<<<<<< HEAD

        last_login: {
            type: Sequelize.DATE
        },

=======
 
>>>>>>> a960d0f87dd066ba69040d033db0f93bb141f753
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }


    });

    User.associate = function (models) {
        User.hasMany(models.Post, {
            as: "posts",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return User;

}