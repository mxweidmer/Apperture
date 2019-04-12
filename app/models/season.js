module.exports = function (sequelize, DataTypes) {
    var Season = sequelize.define("Season", {
        seasonName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    Season.associate = function (models) {
        Season.hasMany(models.Post, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Season;
};
