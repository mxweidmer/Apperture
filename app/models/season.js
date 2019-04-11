module.exports = function (sequelize, DataTypes) {
    var Season = sequelize.define("Season", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Season.associate = function (models) {
        
    };

    return Season;
};
